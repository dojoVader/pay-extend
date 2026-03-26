import { IsNotEmpty, IsString } from 'class-validator';

export class ChromeWebstoreRequest {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  clientSecret: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsString()
  @IsNotEmpty()
  publisherID: string;
}
