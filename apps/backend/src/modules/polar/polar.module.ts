import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PolarService } from './polar.service';
import { PolarController } from './polar.controller';
import { PolarGuard } from './polar.guard';
import { PolarSettings } from '../../dtos/entities/polar/polar-settings.entity';
import { PolarPaymentRecord } from '../../dtos/entities/polar/polar-payment-record.entity';
import { ChromeWebstoreModule } from '../chrome-webstore/chrome-webstore.module';
import { PolarExtensionMapping } from '../../dtos/entities/polar/polar_extension_mappings';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      PolarSettings,
      PolarPaymentRecord,
      PolarExtensionMapping,
    ]),
    ChromeWebstoreModule,
  ],
  providers: [PolarService, PolarGuard],
  controllers: [PolarController],
  exports: [PolarService],
})
export class PolarModule {}
