export class NotificationResponse {
  id: number;
  notification_type: string;
  message: string;
  created_at: Date;
  viewed: boolean;
  viewed_at: Date | null;
  status: string;

  constructor(
    id: number,
    notification_type: string,
    message: string,
    created_at: Date,
    viewed: boolean,
    viewed_at: Date | null,
    status: string,
  ) {
    this.id = id;
    this.notification_type = notification_type;
    this.message = message;
    this.created_at = created_at;
    this.viewed = viewed;
    this.viewed_at = viewed_at;
    this.status = status;
  }
}
