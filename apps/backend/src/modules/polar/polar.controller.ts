import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PolarWebhookLoggerInterceptor } from '../../interceptors/polar-webhook-logger.interceptor';
import { Request } from 'express';
import { WebhookVerificationError } from '@polar-sh/sdk/webhooks';
import { PolarService } from './polar.service';
import { PolarGuard } from './polar.guard';
import { PolarEventHandler } from './polar-event-handler';
import { PolarSettingsRequest } from '../../dtos/requests/polar-settings.request';
import { DiscountCreateRequest } from '../../dtos/requests/polar/discount_create_request';
import { ProductCreateRequest } from '../../dtos/requests/polar/product_create_request';
import { RefundCreateRequest } from '../../dtos/requests/polar/refund_create_request';
import { BenefitCreateRequest } from '../../dtos/requests/polar/benefit_create_request';
import { ConfigService } from '@nestjs/config';
import { PolarSettings } from '../../dtos/entities/polar/polar-settings.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtensionCreateCheckoutSession } from '../../dtos/requests/polar/extension_create_checkout_session';
import { PolarExtensionMapping } from '../../dtos/entities/polar/polar_extension_mappings';
@Controller('polar')
export class PolarController {
  constructor(
    private readonly polarService: PolarService,
    private readonly polarEventHandler: PolarEventHandler,
    private readonly config: ConfigService,
    @InjectRepository(PolarSettings)
    private readonly polarSettingsRepository: Repository<PolarSettings>,
    @InjectRepository(PolarExtensionMapping)
    private readonly polarExtensionMappingRepository: Repository<PolarExtensionMapping>,
  ) {}

  @Get('settings')
  async getSettings() {
    const settings = await this.polarSettingsRepository.findOne({
      where: {},
      order: { id: 'ASC' },
    });
    if (!settings) {
      return {
        oat: '',
        webhookUrl: '/api/polar/webhook',
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

  @Post('extension/payment/:extensionId')
  async createPaymentForExtension(
    @Param('extensionId') extensionId: string,
    @Body() body: ExtensionCreateCheckoutSession,
  ) {
    const mappingRecord = await this.polarExtensionMappingRepository.findOne({
      where: { extensionId },
    });
    return this.polarService.createPaymentForExtension(
      extensionId,
      body,
      mappingRecord.productId,
    );
  }

  @Post('webhook')
  @UseInterceptors(PolarWebhookLoggerInterceptor)
  async handleWebhook(
    @Req() req: Request,
    @Headers() headers: Record<string, string>,
    @Body() payload: Record<string, unknown>,
  ) {
    const secret = this.config.get<string>('POLAR_WEBHOOK_SECRET') ?? '';
    const rawBody: Buffer =
      (req as Request & { rawBody?: Buffer }).rawBody ??
      Buffer.from(JSON.stringify(payload));

    try {
      await this.polarEventHandler.handleEvent(rawBody, headers, secret);
    } catch (err) {
      if (err instanceof WebhookVerificationError) {
        throw new BadRequestException('Invalid webhook signature');
      }
      throw err;
    }

    const eventType = (payload.type as string) ?? 'unknown';
    const environment = this.config.get('POLAR_ENVIRONMENT');
    await this.polarService.createPaymentRecord(
      eventType,
      payload,
      environment ?? 'Test',
    );

    return { received: true };
  }

  @Get('records')
  @UseGuards(PolarGuard)
  async getPaymentRecords() {
    return this.polarService.getPaymentRecords();
  }

  @Get('products/extension/:extensionId')
  async listProductsForExtension(@Param('extensionId') extensionId: string) {
    return this.polarService.listProductsForExtension(extensionId);
  }

  @Get('checkouts/extension/:extensionId')
  async listCheckoutsForExtension(@Param('extensionId') extensionId: string) {
    return this.polarService.listCheckoutsForExtension(extensionId);
  }

  @Get('refunds/extension/:extensionId')
  async listRefundsForExtension(@Param('extensionId') extensionId: string) {
    return this.polarService.listRefundsForExtension(extensionId);
  }

  @Post('refunds')
  async createRefund(@Body() dto: RefundCreateRequest) {
    return this.polarService.createRefund(dto);
  }

  @Post('products')
  async createProduct(@Body() dto: ProductCreateRequest) {
    return this.polarService.createProduct(dto);
  }

  @Delete('products/:id')
  async archiveProduct(@Param('id') id: string) {
    await this.polarService.archiveProduct(id);
    return { message: 'Product archived' };
  }

  @Get('discounts')
  async listDiscounts() {
    return this.polarService.listDiscounts();
  }

  @Get('discounts/:id')
  async getDiscount(@Param('id') id: string) {
    return this.polarService.getDiscount(id);
  }
  @Post('discounts')
  async createDiscount(@Body() dto: DiscountCreateRequest) {
    console.log(dto);
    const discount = await this.polarService.createDiscount(dto);
    return { message: 'Discount created successfully', discount };
  }

  @Patch('discounts/:id')
  async updateDiscount(
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.polarService.updateDiscount(id, body);
  }

  @Delete('discounts/:id')
  async deleteDiscount(@Param('id') id: string) {
    await this.polarService.deleteDiscount(id);
    return { message: 'Discount deleted' };
  }

  // ── Benefits ──────────────────────────────────────────────────────────────

  @Post('benefits')
  async createBenefit(@Body() dto: BenefitCreateRequest) {
    return this.polarService.createBenefit(dto);
  }

  // ── License Keys ──────────────────────────────────────────────────────────

  @Get('licenses/extension/:extensionId')
  async listLicensesForExtension(@Param('extensionId') extensionId: string) {
    return this.polarService.listLicensesForExtension(extensionId);
  }

  @Get('licenses/:id')
  async getLicense(@Param('id') id: string) {
    return this.polarService.getLicense(id);
  }

  @Patch('licenses/:id')
  async updateLicense(
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.polarService.updateLicense(id, body);
  }

  @Post('licenses/:id/activate')
  async activateLicense(
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.polarService.activateLicense(id, body);
  }

  @Post('licenses/:id/deactivate')
  async deactivateLicense(
    @Param('id') id: string,
    @Body() body: { activation_id: string },
  ) {
    return this.polarService.deactivateLicense(id, body.activation_id);
  }

  @Get('licenses/:id/activations')
  async getLicenseActivations(@Param('id') id: string) {
    return this.polarService.getLicenseActivations(id);
  }

  // ── Customers ─────────────────────────────────────────────────────────────

  @Get('customers')
  async listCustomers(@Query('page') page = '1', @Query('limit') limit = '20') {
    return this.polarService.listCustomers(Number(page), Number(limit));
  }

  @Get('customers/:id')
  async getCustomer(@Param('id') id: string) {
    return this.polarService.getCustomer(id);
  }

  @Get('customers/:id/subscriptions')
  async listCustomerSubscriptions(@Param('id') id: string) {
    return this.polarService.listCustomerSubscriptions(id);
  }

  @Post('mapping')
  async createMapping(
    @Body()
    body: {
      extensionId: string;
      discountId?: string;
      productId?: string;
      checkSessionId?: string;
      subscriptionId?: string;
    },
  ) {
    return this.polarService.createMapping(body.extensionId, {
      productId: body.productId,
      checkSessionId: body.checkSessionId,
      subscriptionId: body.subscriptionId,
    });
  }
}
