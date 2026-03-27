import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolarSettings } from '../../dtos/entities/polar/polar-settings.entity';
import { PolarPaymentRecord } from '../../dtos/entities/polar/polar-payment-record.entity';
import { PolarSettingsRequest } from '../../dtos/requests/polar-settings.request';
import { PolarExtensionMapping } from "../../dtos/entities/polar/polar_extension_mappings";

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
  ) {}

  async getSettings(): Promise<PolarSettings | null> {
    return this.settingsRepo.findOne({ where: {} });
  }

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
    extensionId: number,
    data: Partial<Pick<PolarExtensionMapping, 'productId' | 'discountId' | 'checkSessionId' | 'subscriptionId'>>,
  ): Promise<PolarExtensionMapping> {
    const mapping = this.polarMappingsRepo.create({ extensionId, ...data });
    return this.polarMappingsRepo.save(mapping);
  }

  async updateMapping(
    id: number,
    data: Partial<Pick<PolarExtensionMapping, 'productId' | 'discountId' | 'checkSessionId' | 'subscriptionId'>>,
  ): Promise<PolarExtensionMapping> {
    const mapping = await this.polarMappingsRepo.findOneBy({ id });
    if (!mapping) {
      throw new NotFoundException(`Polar mapping with id ${id} not found`);
    }
    Object.assign(mapping, data);
    return this.polarMappingsRepo.save(mapping);
  }

  async getMappingByExtensionId(extensionId: number): Promise<PolarExtensionMapping | null> {
    return this.polarMappingsRepo.findOneBy({ extensionId });
  }
}
