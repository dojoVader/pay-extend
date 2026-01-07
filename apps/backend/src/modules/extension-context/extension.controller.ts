import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExtensionService } from './extension.service';
import { ExtensionRequest } from '../../dtos/requests/extension.request';

@Controller('extension')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}

  @Get('hello')
  public hello(): string {
    return 'Hello, Extension!';
  }

  @Get('all')
  async getAllExtensions() {
    return this.extensionService.getAllExtensions();
  }

  @Post('add')
  async addExtension(@Body() extensionRequest: ExtensionRequest) {
    return this.extensionService.create(extensionRequest);
  }
}
