import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PolarService } from './polar.service';
import { PolarController } from './polar.controller';
import { PolarGuard } from './polar.guard';
import { PolarSettings } from '../../dtos/entities/polar-settings.entity';
import { PolarPaymentRecord } from '../../dtos/entities/polar-payment-record.entity';
import { ChromeWebstoreModule } from '../chrome-webstore/chrome-webstore.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PolarSettings, PolarPaymentRecord]),
    ChromeWebstoreModule,
  ],
  providers: [PolarService, PolarGuard],
  controllers: [PolarController],
  exports: [PolarService],
})
export class PolarModule {}
