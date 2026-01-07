import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNotificationRequest {
  @IsString()
  @IsNotEmpty()
  notification_type: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  status?: string;

  constructor(notification_type: string, message: string, status?: string) {
    this.notification_type = notification_type;
    this.message = message;
    this.status = status;
  }
}
