import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiquidModule } from './modules/liquid/liquid.module';
import {
  LIQUID_LAYOUTS_FOLDER,
  LIQUID_TEMPLATE_DEFAULT_FOLDER,
} from './modules/liquid/constants';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './modules/auth/strategies/local.strategy';

@Module({
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '../dtos/entities/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    }),
    LiquidModule.forRoot({
      root: LIQUID_TEMPLATE_DEFAULT_FOLDER, // Directory where your Liquid templates are stored
      layouts: LIQUID_LAYOUTS_FOLDER, // Directory for layout templates
      extname: '.liquid', // File extension for Liquid templates
      cache: process.env.NODE_ENV === 'production', // Enable caching in production
      dynamicPartials: true, // Allow dynamic partials
    }),
    DashboardModule.forRoot({
      appName: 'PayExtend',
      version: '1.0.0',
      logoUrl: '/logo.png',
      menuItems: [
        {
          name: 'Dashboard',
          path: '/home',
          roles: ['ADMIN'],
        },
      ],
    }),
    AuthModule,
  ],
})
export class AppModule {}
