import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationSettings } from '../../../dtos/entities/configuration.entity';

@Injectable()
export class ConfigSettingsService {
  public constructor(
    @InjectRepository(ConfigurationSettings)
    private readonly configurationSettingsRepository: Repository<ConfigurationSettings>,
  ) {}

  public async getSettings(key: string): Promise<ConfigurationSettings> {
    return this.configurationSettingsRepository.findOneBy({ key });
  }
}
