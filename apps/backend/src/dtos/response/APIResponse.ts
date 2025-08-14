export class APIResponse {
  success: boolean;
  message: string;
  data?: any;

  constructor(message: string, success: boolean, data?: any) {
    this.success = success;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}
