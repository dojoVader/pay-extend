import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiquidModule } from './liquid/liquid.module';
import { LiquidService } from './liquid/service/liquid.service';
import { LIQUID_TEMPLATE_DEFAULT_FOLDER } from './liquid/constants';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    LiquidModule.forRoot({
      root: LIQUID_TEMPLATE_DEFAULT_FOLDER, // Directory where your Liquid templates are stored
      extname: '.liquid', // File extension for Liquid templates
      cache: process.env.NODE_ENV === 'production', // Enable caching in production
      dynamicPartials: true, // Allow dynamic partials
    }),
  ],
})
export class AppModule {}
