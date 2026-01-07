import { Module } from '@nestjs/common';
import { ChromeWebstoreService } from './chrome-webstore.service';
import { HttpModule } from '@nestjs/axios';
import { ChromeWebstoreController } from './chrome-webstore.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationSettings } from '../../dtos/entities/configuration.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ConfigurationSettings]),
    ConfigModule,
  ],
  providers: [ChromeWebstoreService],
  controllers: [ChromeWebstoreController],
  exports: [ChromeWebstoreService],
})
export class ChromeWebstoreModule {}
