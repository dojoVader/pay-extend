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
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async register(email: string, password: string, role = 'user') {
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
    });
    return this.userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('SECRET'),
    });
    // Set HTTP-only, same-site cookie

    return {
      access_token: accessToken,
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
