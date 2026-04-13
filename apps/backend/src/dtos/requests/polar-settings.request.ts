import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PolarSettingsRequest {
  @IsString()
  @IsNotEmpty()
  oat: string;

  @IsString()
  @IsNotEmpty()
  webhookUrl: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsString()
  @IsIn(['live', 'test'])
  @IsOptional()
  environment?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  webhookEvents?: string[];
}
