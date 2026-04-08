import { Module } from '@nestjs/common';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtensionContextModule } from './modules/extension-context/extension-context.module';
import { Installation } from './dtos/entities/installation.entity';
import { User } from './dtos/entities/user.entity';
import { ExtensionContext } from './dtos/entities/extension.entity';
import { DomSelector } from './dtos/entities/domselectors.entity';
import { Notification } from './dtos/entities/notifications.entity';
import { NotificationModule } from './modules/notifications/notification.module';
import { ChromeWebstoreModule } from './modules/chrome-webstore/chrome-webstore.module';
import { PolarModule } from './modules/polar/polar.module';
import { ConfigurationSettings } from './dtos/entities/configuration.entity';
import { PolarSettings } from './dtos/entities/polar/polar-settings.entity';
import { PolarPaymentRecord } from './dtos/entities/polar/polar-payment-record.entity';
import { PolarExtensionMapping } from './dtos/entities/polar/polar_extension_mappings';
import { FirebaseAdminModule } from './modules/firebase/firebase.module';

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
      username: process.env.DB_USERNAME || 'polarkit',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'polarkit',
      entities: [
        Installation,
        User,
        ExtensionContext,
        DomSelector,
        Notification,
        ConfigurationSettings,
        PolarSettings,
        PolarPaymentRecord,
        PolarExtensionMapping,
      ],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    }),
    DashboardModule.forRoot({
      appName: 'Polarkit',
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
    NotificationModule,
    ChromeWebstoreModule,
    PolarModule,
    FirebaseAdminModule,
  ],
})
export class AppModule {}
