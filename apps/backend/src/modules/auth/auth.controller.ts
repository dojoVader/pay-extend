import {
  Controller,
  Post,
  Body,
  Header,
  Req,
  HttpException, HttpStatus
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { APIResponse } from '../../dtos/response/APIResponse';
import { LoginRequest } from '../../dtos/requests/login.request';
import { RegisterRequest } from "../../dtos/requests/register.request";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Header('accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async register(@Body() body: RegisterRequest) {
    if (body?.username && body?.password) {
      return this.authService.register(body.username, body.password);
    } else {
      throw new HttpException(
        'All fields are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  @Header('accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async login(@Body() body: LoginRequest) {
    console.log(body);
    return this.authService.login(body.username, body.password);
  }
}
