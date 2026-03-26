import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolarSettings } from '../../dtos/entities/polar-settings.entity';
import { PolarPaymentRecord } from '../../dtos/entities/polar-payment-record.entity';
import { PolarSettingsRequest } from '../../dtos/requests/polar-settings.request';

@Injectable()
export class PolarService {
  private readonly logger = new Logger(PolarService.name);

  constructor(
    @InjectRepository(PolarSettings)
    private readonly settingsRepo: Repository<PolarSettings>,
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
}
