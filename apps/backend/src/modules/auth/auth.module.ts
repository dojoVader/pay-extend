import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../dtos/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import * as process from 'node:process';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from "./guards/jwtauth.guard";
import { APP_GUARD } from "@nestjs/core";
import { Installation } from "../../dtos/entities/installation.entity";

console.log(process.env.SECRET); // Ensure this is set in your environment

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Installation]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
