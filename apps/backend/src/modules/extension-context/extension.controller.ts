import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
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

  @Get(':id')
  async getExtensionById(@Param('id') id: string) {
    return this.extensionService.getExtensionById(id);
  }

  @Post('add')
  async addExtension(@Body() extensionRequest: ExtensionRequest) {
    return this.extensionService.create(extensionRequest);
  }
}
