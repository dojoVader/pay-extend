import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';
import { firstValueFrom } from 'rxjs';
import { ConfigurationSettings } from '../../dtos/entities/configuration.entity';
import { ChromeWebstoreFetchStatusResponse } from '../../dtos/response/chromewebstore_fetchStatus';

@Injectable()
export class ChromeWebstoreService {
  private oauth2Client: OAuth2Client;
  public publisherID: ConfigurationSettings;

  constructor(
    private config: ConfigService,
    private httpService: HttpService,
    @InjectRepository(ConfigurationSettings)
    private configRepo: Repository<ConfigurationSettings>,
  ) {
    this.oauth2Client = new OAuth2Client({
      clientId: this.config.get('CLIENT_ID'),
      clientSecret: this.config.get('CLIENT_SECRET'),
      redirectUri: 'https://developers.google.com/oauthplayground',
      forceRefreshOnFailure: true,
    });
    this.oauth2Client.setCredentials({
      expiry_date: Date.now() + 3600 * 1000, // 1 hour in the future
      refresh_token: this.config.get('REFRESH_TOKEN'),
      scope:
        'https://www.googleapis.com/auth/chromewebstore https://www.googleapis.com/auth/chromewebstore.readonly',
    });
  }

  async isCredentialSet(): Promise<boolean> {
    const clientId = this.config.get<string>('CLIENT_ID');
    const clientSecret = this.config.get<string>('CLIENT_SECRET');
    const refreshToken = this.config.get<string>('REFRESH_TOKEN');
    const publisherSetting = await this.configRepo.findOne({
      where: { key: 'chrome:webstore:publisherID' },
    });
    return !!(
      clientId &&
      clientSecret &&
      refreshToken &&
      publisherSetting?.value
    );
  }

  async getItemStatus(
    itemId: string,
  ): Promise<ChromeWebstoreFetchStatusResponse> {
    try {
      const publisherId: ConfigurationSettings = await this.configRepo.findOne({
        where: { key: 'chrome:webstore:publisherID' },
      });
      const { token } = await this.oauth2Client.getAccessToken();
      const response = await firstValueFrom(
        this.httpService.get(
          `https://chromewebstore.googleapis.com/v2/publishers/${publisherId.value}/items/${itemId}:fetchStatus`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get item status: ${error.message}`);
    }
  }
}
