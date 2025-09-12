import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionContext } from '../../dtos/entities/extension.entity';
import { ExtensionService } from './extension.service';

@Module({
  providers: [ExtensionService],
  imports: [TypeOrmModule.forFeature([ExtensionContext])],
})
export class ExtensionContextModule {}
