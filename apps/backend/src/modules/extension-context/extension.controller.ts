import { Controller, Get } from '@nestjs/common';

@Controller('extension')
export class ExtensionController {
  @Get('hello')
  public hello(): string {
    return 'Hello, Extension!';
  }
}
