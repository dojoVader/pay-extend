import { IsNotEmpty, IsString } from 'class-validator';
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
  status: string;

  @IsString()
  publicKey: string;

  @IsString()
  extensionLogo: string;
}
