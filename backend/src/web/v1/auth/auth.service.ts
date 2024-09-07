import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { v4 } from 'uuid';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const id = v4();
    const user = {
      ...registerDto,
      password: hashedPassword,
      id,
    };

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException('User already exists');
    }

    const token = this.jwtService.sign({
      id: user.id,
      phoneNumber: user.phoneNumber,
      phoneCode: user.phoneCode,
    });

    return token;
  }

  async login({ phoneNumber, password }: LoginDto) {
    const user = await this.usersRepository.findOne({ where: { phoneNumber } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({
      id: user.id,
      phoneNumber: user.phoneNumber,
      phoneCode: user.phoneCode,
    });
    return token;
  }
}
