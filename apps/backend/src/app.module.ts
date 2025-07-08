import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiquidModule } from './modules/liquid/liquid.module';
import { LIQUID_TEMPLATE_DEFAULT_FOLDER } from './modules/liquid/constants';

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
