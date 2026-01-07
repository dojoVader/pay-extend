import { IsNotEmpty, IsString } from 'class-validator';

export class ChromeWebstoreRequest {
  @IsString()
  @IsNotEmpty()
  publisherID: string;
}
