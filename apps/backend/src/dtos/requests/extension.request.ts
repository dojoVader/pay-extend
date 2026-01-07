import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
export class ExtensionRequest {
  @IsString()
  @IsNotEmpty()
  extensionItemId: string;

  @IsString()
  @IsNotEmpty()
  extensionName: string;

  @IsString()
  @IsNotEmpty()
  extensionDescription: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  publicKey: string;

  @IsString()
  @IsOptional()
  extensionLogo: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
