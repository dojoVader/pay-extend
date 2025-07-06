import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('hello') // The liquid template check if it works
  getHello() {
    return { message: 'Hello, Liquid!' };
  }
}
