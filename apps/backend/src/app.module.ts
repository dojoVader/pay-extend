import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LiquidModule } from './modules/liquid/liquid.module';
import { LIQUID_TEMPLATE_DEFAULT_FOLDER } from './modules/liquid/constants';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { TypeORMariaDBProvider } from './modules/typeorm-db/mariadb.provider';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService, ...TypeORMariaDBProvider],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),

    LiquidModule.forRoot({
      root: LIQUID_TEMPLATE_DEFAULT_FOLDER, // Directory where your Liquid templates are stored
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
