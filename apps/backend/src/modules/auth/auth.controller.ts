import {
  Controller,
  Post,
  Body,
  Header,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequest } from '../../dtos/requests/login.request';
import { RegisterRequest } from '../../dtos/requests/register.request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Header('accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async register(@Body() body: RegisterRequest) {
    if (body?.email && body?.password) {
      return this.authService.register(body.email, body.password);
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
  async login(
    @Body() body: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, name } = await this.authService.login(
      body.email,
      body.password,
    );
    res.cookie('jwt', access_token, {
      httpOnly: true, // Prevents client-side JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      sameSite: 'strict', // CSRF protection
      maxAge: 1000 * 60 * 60, // 1 hour
      path: '/', // Accessible across the app
    });
    return {
      message: 'Login successful',
      access_token,
      name,
    };
  }
}
