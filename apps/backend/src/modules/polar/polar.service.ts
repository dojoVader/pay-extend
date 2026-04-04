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
import { ProductCreateRequest } from '../../dtos/requests/polar/product_create_request';
import { PolarProductCreateResponse } from '../../dtos/response/polar/polar_product_create';
import { RefundCreateRequest } from '../../dtos/requests/polar/refund_create_request';
import { BenefitCreateRequest } from '../../dtos/requests/polar/benefit_create_request';
import { PolarBenefitResponse } from '../../dtos/response/polar/polar_benefits_reponse';

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
        | 'productId'
        | 'refundId'
        | 'checkSessionId'
        | 'subscriptionId'
        | 'benefitsId'
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
        | 'productId'
        | 'refundId'
        | 'checkSessionId'
        | 'subscriptionId'
        | 'benefitsId'
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

  async listProductsForExtension(extensionId: string): Promise<unknown> {
    const mappings = await this.polarMappingsRepo.find({
      where: { extensionId },
    });
    const productIds = [
      ...new Set(mappings.map((m) => m.productId).filter(Boolean)),
    ] as string[];
    if (!productIds.length) return { items: [] };
    const params = new URLSearchParams();
    productIds.forEach((id) => params.append('id', id));
    return this.polarFetch(`/v1/products?${params.toString()}`);
  }

  async listCheckoutsForExtension(extensionId: string): Promise<unknown> {
    const mappings = await this.polarMappingsRepo.find({
      where: { extensionId },
    });
    const sessionIds = [
      ...new Set(mappings.map((m) => m.checkSessionId).filter(Boolean)),
    ] as string[];
    if (!sessionIds.length) return { items: [] };
    const params = new URLSearchParams();
    sessionIds.forEach((id) => params.append('id', id));
    return this.polarFetch(`/v1/checkouts?${params.toString()}`);
  }

  async createProduct(
    dto: ProductCreateRequest,
  ): Promise<PolarProductCreateResponse> {
    const price: Record<string, unknown> = {
      amount_type: dto.amountType,
      type: dto.priceType,
      ...(dto.amountType === 'fixed' && {
        price_amount: dto.priceAmount,
        price_currency: dto.priceCurrency ?? 'usd',
      }),
      ...(dto.priceType === 'recurring' && {
        recurring_interval: dto.recurringInterval ?? 'month',
      }),
    };

    const product = (await this.polarFetch('/v1/products', {
      method: 'POST',
      body: JSON.stringify({
        name: dto.name,
        ...(dto.description && { description: dto.description }),
        prices: [price],
      }),
    })) as PolarProductCreateResponse;

    await this.createMapping(dto.extensionId, { productId: product.id });
    return product;
  }

  async archiveProduct(id: string): Promise<unknown> {
    return this.polarFetch(`/v1/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_archived: true }),
    });
  }

  async listRefundsForExtension(extensionId: string): Promise<unknown> {
    const mappings = await this.polarMappingsRepo.find({
      where: { extensionId },
    });
    const refundIds = [
      ...new Set(mappings.map((m) => m.refundId).filter(Boolean)),
    ] as string[];
    if (!refundIds.length) return { items: [] };
    const params = new URLSearchParams();
    refundIds.forEach((id) => params.append('id', id));
    return this.polarFetch(`/v1/refunds?${params.toString()}`);
  }

  async createRefund(dto: RefundCreateRequest): Promise<unknown> {
    const refund = (await this.polarFetch('/v1/refunds', {
      method: 'POST',
      body: JSON.stringify({
        order_id: dto.orderId,
        ...(dto.amount && { amount: dto.amount }),
        ...(dto.reason && { reason: dto.reason }),
      }),
    })) as { id: string };
    await this.createMapping(dto.extensionId, { refundId: refund.id });
    return refund;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { extensionId, ...payload } = data;
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

  // ── Benefits ──────────────────────────────────────────────────────────────

  async createBenefit(dto: BenefitCreateRequest): Promise<PolarBenefitResponse> {
    const properties: Record<string, unknown> = {};
    if (dto.activationLimit) {
      properties['activations'] = {
        limit: dto.activationLimit,
        enable_customer_cancel: true,
      };
    }
    if (dto.usageLimit) {
      properties['limit_usage'] = dto.usageLimit;
    }

    const benefit = (await this.polarFetch('/v1/benefits', {
      method: 'POST',
      body: JSON.stringify({
        type: 'license_keys',
        name: dto.name,
        ...(dto.description && { description: dto.description }),
        properties,
      }),
    })) as PolarBenefitResponse;

    const existing = await this.getMappingByExtensionId(dto.extensionId);
    if (existing) {
      await this.updateMapping(existing.id, { benefitsId: benefit.id });
    } else {
      await this.createMapping(dto.extensionId, { benefitsId: benefit.id });
    }

    return benefit;
  }

  // ── License Keys ──────────────────────────────────────────────────────────

  async listLicensesForExtension(extensionId: string): Promise<unknown> {
    const mapping = await this.getMappingByExtensionId(extensionId);
    if (!mapping?.benefitsId) return { items: [] };
    return this.polarFetch(
      `/v1/license-keys?benefit_id=${mapping.benefitsId}`,
    );
  }

  async getLicense(id: string): Promise<unknown> {
    return this.polarFetch(`/v1/license-keys/${id}`);
  }

  async updateLicense(
    id: string,
    data: Record<string, unknown>,
  ): Promise<unknown> {
    return this.polarFetch(`/v1/license-keys/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async activateLicense(
    id: string,
    data: Record<string, unknown>,
  ): Promise<unknown> {
    return this.polarFetch(`/v1/license-keys/${id}/activate`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deactivateLicense(
    id: string,
    activationId: string,
  ): Promise<unknown> {
    return this.polarFetch(`/v1/license-keys/${id}/deactivate`, {
      method: 'POST',
      body: JSON.stringify({ activation_id: activationId }),
    });
  }

  async getLicenseActivations(id: string): Promise<unknown> {
    return this.polarFetch(`/v1/license-keys/${id}/activations`);
  }
}
