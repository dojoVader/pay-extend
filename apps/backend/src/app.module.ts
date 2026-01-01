import { Module } from '@nestjs/common';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionContextModule } from './modules/extension-context/extension-context.module';
import { Installation } from "./dtos/entities/installation.entity";
import { User } from "./dtos/entities/user.entity";
import { ExtensionContext } from "./dtos/entities/extension.entity";
import { DomSelector } from "./dtos/entities/domselectors.entity";

@Module({
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'payextend',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'payextend',
      entities: [Installation, User,ExtensionContext, DomSelector],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
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
    ExtensionContextModule,
  ],
})
export class AppModule {}
