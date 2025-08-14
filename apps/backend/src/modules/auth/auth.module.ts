import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../dtos/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import * as process from 'node:process';

console.log(process.env.SECRET); // Ensure the SECRET is set in your environment variables
@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secret: 'secret', //|| process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
