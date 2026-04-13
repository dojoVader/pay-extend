import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationSettings } from '../../dtos/entities/configuration.entity';
import { ChromeWebstoreRequest } from '../../dtos/requests/chrome-webstore.request';
import { ChromeWebstoreService } from './chrome-webstore.service';
import { ChromeWebstoreFetchStatusResponse } from '../../dtos/response/chromewebstore_fetchStatus';

@Controller('chrome-webstore')
export class ChromeWebstoreController {
  constructor(
    private config: ConfigService,
    private chromeWebstoreService: ChromeWebstoreService,
    @InjectRepository(ConfigurationSettings)
    private configRepo: Repository<ConfigurationSettings>,
  ) {}

  @Get('config')
  async getConfig() {
    const clientId = this.config.get('CLIENT_ID');
    const secret = this.config.get('CLIENT_SECRET');
    const refreshToken = this.config.get('REFRESH_TOKEN');

    const publisherSetting = await this.configRepo.findOne({
      where: { key: 'chrome:webstore:publisherID' },
    });

    return {
      clientId,
      secret,
      refreshToken,
      publisherID: publisherSetting?.value,
      configured: !!publisherSetting,
      message:
        !clientId || !secret || !refreshToken || !publisherSetting
          ? 'Incomplete configuration, check your .env and publisher ID'
          : 'Configuration successful',
    };
  }

  @Post('config')
  async saveConfig(@Body() request: ChromeWebstoreRequest) {
    const existing = await this.configRepo.findOne({
      where: { key: 'chrome:webstore:publisherID' },
    });

    if (existing) {
      existing.value = request.publisherID;
      await this.configRepo.save(existing);
    } else {
      const newSetting = this.configRepo.create({
        key: 'chrome:webstore:publisherID',
        value: request.publisherID,
      });
      await this.configRepo.save(newSetting);
    }

    return { message: 'Publisher ID saved successfully' };
  }

  @Get('items/:extensionId')
  async getExtensionItem(
    @Param('extensionId') extensionId: string,
  ): Promise<ChromeWebstoreFetchStatusResponse> {
    const configured = await this.chromeWebstoreService.isCredentialSet();
    if (!configured) {
      throw new NotFoundException(
        'Chrome Web Store credentials are not configured',
      );
    }
    return this.chromeWebstoreService.getItemStatus(extensionId);
  }
}
