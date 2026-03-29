import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolarSettings } from '../../dtos/entities/polar/polar-settings.entity';
import { PolarPaymentRecord } from '../../dtos/entities/polar/polar-payment-record.entity';
import { PolarSettingsRequest } from '../../dtos/requests/polar-settings.request';
import { PolarExtensionMapping } from '../../dtos/entities/polar/polar_extension_mappings';
import { ConfigService } from '@nestjs/config';
import { DiscountCreateRequest } from '../../dtos/requests/polar/discount_create_request';
import { PolarDiscountCreateResponse } from '../../dtos/response/polar/polar_discount_create';

@Injectable()
export class PolarService {
  private readonly logger = new Logger(PolarService.name);

  constructor(
    @InjectRepository(PolarSettings)
    private readonly settingsRepo: Repository<PolarSettings>,
    @InjectRepository(PolarExtensionMapping)
    private readonly polarMappingsRepo: Repository<PolarExtensionMapping>,
    @InjectRepository(PolarPaymentRecord)
    private readonly paymentRecordRepo: Repository<PolarPaymentRecord>,
    private config: ConfigService,
  ) {}

  async saveSettings(dto: PolarSettingsRequest): Promise<PolarSettings> {
    const existing = await this.settingsRepo.findOne({ where: {} });

    if (existing) {
      existing.oat = dto.oat;
      existing.webhookUrl = dto.webhookUrl;
      existing.enabled = dto.enabled ?? existing.enabled;
      existing.environment = dto.environment ?? existing.environment;
      existing.webhookEvents = dto.webhookEvents ?? existing.webhookEvents;
      return this.settingsRepo.save(existing);
    }

    const settings = this.settingsRepo.create({
      oat: dto.oat,
      webhookUrl: dto.webhookUrl,
      enabled: dto.enabled ?? false,
      environment: dto.environment ?? 'test',
      webhookEvents: dto.webhookEvents ?? [],
    });
    return this.settingsRepo.save(settings);
  }

  async createPaymentRecord(
    eventType: string,
    payload: object,
    environment: string,
  ): Promise<PolarPaymentRecord> {
    const record = this.paymentRecordRepo.create({
      eventType,
      payload: JSON.stringify(payload),
      environment,
    });
    return this.paymentRecordRepo.save(record);
  }

  async getPaymentRecords(): Promise<PolarPaymentRecord[]> {
    return this.paymentRecordRepo.find({ order: { createdAt: 'DESC' } });
  }

  async createMapping(
    extensionId: string,
    data: Partial<
      Pick<
        PolarExtensionMapping,
        'productId' | 'checkSessionId' | 'subscriptionId'
      >
    >,
  ): Promise<PolarExtensionMapping> {
    const mapping = this.polarMappingsRepo.create({ extensionId, ...data });
    return this.polarMappingsRepo.save(mapping);
  }

  async updateMapping(
    id: number,
    data: Partial<
      Pick<
        PolarExtensionMapping,
        'productId' | 'checkSessionId' | 'subscriptionId'
      >
    >,
  ): Promise<PolarExtensionMapping> {
    const mapping = await this.polarMappingsRepo.findOneBy({ id });
    if (!mapping) {
      throw new NotFoundException(`Polar mapping with id ${id} not found`);
    }
    Object.assign(mapping, data);
    return this.polarMappingsRepo.save(mapping);
  }

  async getMappingByExtensionId(
    extensionId: string,
  ): Promise<PolarExtensionMapping | null> {
    return this.polarMappingsRepo.findOneBy({ extensionId });
  }

  private polarBaseUrl(environment: string): string {
    return environment === 'production'
      ? 'https://api.polar.sh'
      : 'https://sandbox-api.polar.sh';
  }

  private async polarFetch(
    path: string,
    options: RequestInit = {},
  ): Promise<unknown> {
    const oat = await this.config.get('POLAR_ACCESS_TOKEN');
    const environment = await this.config.get('POLAR_ENVIRONMENT');
    const base = this.polarBaseUrl(environment ?? 'sandbox');
    const response = await fetch(`${base}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${oat}`,
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Polar API error ${response.status}: ${error}`);
    }
    if (response.status === 204) return null;
    return response.json();
  }

  async listDiscounts(): Promise<unknown> {
    return this.polarFetch('/v1/discounts');
  }

  async getDiscount(id: string): Promise<unknown> {
    return this.polarFetch(`/v1/discounts/${id}`);
  }

  async createDiscount(
    data: DiscountCreateRequest,
  ): Promise<PolarDiscountCreateResponse> {
    const { extensionId: _, ...payload } = data;
    return (await this.polarFetch('/v1/discounts', {
      method: 'POST',
      body: JSON.stringify(payload),
    })) as PolarDiscountCreateResponse;
  }

  async updateDiscount(
    id: string,
    data: Record<string, unknown>,
  ): Promise<unknown> {
    return this.polarFetch(`/v1/discounts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteDiscount(id: string): Promise<void> {
    await this.polarFetch(`/v1/discounts/${id}`, { method: 'DELETE' });
  }
}
