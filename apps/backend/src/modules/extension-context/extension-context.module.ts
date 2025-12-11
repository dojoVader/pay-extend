import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionContext } from '../../dtos/entities/extension.entity';
import { ExtensionService } from './extension.service';
import { ExtensionController } from './extension.controller';

@Module({
  controllers: [ExtensionController],
  providers: [ExtensionService],
  imports: [TypeOrmModule.forFeature([ExtensionContext])],
})
export class ExtensionContextModule {}
