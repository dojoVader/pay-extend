import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PolarService } from './polar.service';
import { PolarGuard } from './polar.guard';
import { PolarSettingsRequest } from '../../dtos/requests/polar-settings.request';
@Controller('polar')
export class PolarController {
  constructor(private readonly polarService: PolarService) {}

  @Get('settings')
  async getSettings() {
    const settings = await this.polarService.getSettings();
    if (!settings) {
      return {
        oat: '',
        webhookUrl: '',
        enabled: false,
        environment: 'test',
        webhookEvents: [],
      };
    }
    return settings;
  }

  @UseGuards(PolarGuard)
  @Post('settings')
  async saveSettings(@Body() dto: PolarSettingsRequest) {
    const settings = await this.polarService.saveSettings(dto);
    return { message: 'Polar settings saved successfully', settings };
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: Record<string, unknown>) {
    const eventType = (payload.type as string) ?? 'unknown';
    const settings = await this.polarService.getSettings();
    const environment = settings?.environment ?? 'test';

    await this.polarService.createPaymentRecord(
      eventType,
      payload,
      environment,
    );
    return { received: true };
  }

  @Get('records')
  @UseGuards(PolarGuard)
  async getPaymentRecords() {
    return this.polarService.getPaymentRecords();
  }
}
