import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { OAuth2Client } from 'google-auth-library';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChromeWebstoreService {
  private oauth2Client: OAuth2Client;

  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {
    this.oauth2Client = new OAuth2Client(
      this.config.get('CLIENT_ID'),
      this.config.get('CLIENT_SECRET'),
    );
    this.oauth2Client.setCredentials({
      refresh_token: this.config.get('REFRESH_TOKEN'),
    });
  }

  async getItemStatus(itemId: string) {
    try {
      const { token } = await this.oauth2Client.getAccessToken();
      const response = await firstValueFrom(
        this.httpService.get(
          `https://www.googleapis.com/chromewebstore/v1.1/items/${itemId}`,
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
