import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ForbiddenException, UnauthorizedFilter } from './modules/auth/filters';
import { JwtGuard } from './modules/auth/guards/jwtauth.guard';

@Controller()
@UseFilters(UnauthorizedFilter, ForbiddenException)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get()
  @Render('hello') // The liquid template check if it works
  login() {
    return { message: 'Hello, Liquid!' };
  }

  @Get('/login')
  @Render('login')
  loginPage() {
    return { message: 'Login' };
  }

  @Get('/logout')
  @Render('logout')
  logout() {
    return { message: 'Logged Out' };
  }

  @Get('/dashboard')
  @Render('dashboard')
  index() {
    return { message: 'Dashboard' };
  }
}
