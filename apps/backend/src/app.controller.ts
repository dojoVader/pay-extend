import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UnauthorizedFilter } from './modules/auth/filters';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './modules/auth/guards/roles.guard';

@Controller()
@UseFilters(UnauthorizedFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('local'), RolesGuard)
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
}
