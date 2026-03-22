import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../dtos/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Installation } from '../../dtos/entities/installation.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Installation)
    private installation: Repository<Installation>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(email: string, password: string, role = 'user', name = '') {
    // Check if the user already exists
    const existingUser = await this.userRepository.find({
      where: { email },
    });
    if (existingUser.length > 0) {
      throw new HttpException(
        'The user already exists on this platform',
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      role,
      name,
    });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // // Check if installation exists for the user
    // const installation = await this.installation.findOneBy({
    //   user_id: user.id,
    // });
    // if (!installation) {
    //   throw new BadRequestException({
    //     message:
    //       'No installation found for this user.',
    //   });
    // }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('SECRET'),
    });
    // Set HTTP-only, same-site cookie
    res.cookie('jwt', accessToken, {
      httpOnly: false, // Prevents client-side JavaScript access
      secure: false, // Use secure in production
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
      maxAge: 1000 * 60 * 60, // 1 hour
      path: '/', // Accessible across the app
    });

    return {
      access_token: accessToken,
      name: user.name,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: username });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordMatched = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
