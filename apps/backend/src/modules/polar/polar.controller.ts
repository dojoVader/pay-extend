import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PolarService } from './polar.service';
import { PolarGuard } from './polar.guard';
import { PolarSettingsRequest } from '../../dtos/requests/polar-settings.request';
import { DiscountCreateRequest } from '../../dtos/requests/polar/discount_create_request';
import { ProductCreateRequest } from '../../dtos/requests/polar/product_create_request';
import { RefundCreateRequest } from '../../dtos/requests/polar/refund_create_request';
import { ConfigService } from '@nestjs/config';
@Controller('polar')
export class PolarController {
  constructor(
    private readonly polarService: PolarService,
    private readonly config: ConfigService,
  ) {}

  @Get('settings')
  async getSettings() {
    const settings = await this.config.get('POLAR_ACCESS_TOKEN');
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
    const environment = await this.config.get('POLAR_ENVIRONMENT');

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

    await this.polarService.createMapping(dto.extensionId, {
      discountId: discount.id,
    });
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
