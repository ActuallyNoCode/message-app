import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { v4 } from 'uuid';

import * as bcrypt from 'bcrypt';
import { Session } from 'src/entities/sessions.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
    private sessionJwtService: JwtService,
    private refreshJwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
    deviceInfo: string,
  ): Promise<TokenResponse> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const id = v4();
    const sessionId = v4();
    const user = {
      ...registerDto,
      password: hashedPassword,
      id,
    };

    if (deviceInfo === 'Unknown')
      throw new UnauthorizedException('Invalid device');

    try {
      const savedUser = await this.usersRepository.save(user);

      if (!savedUser) throw new ConflictException('User already exists');

      const session = {
        id: sessionId,
        user: savedUser,
        deviceInfo,
      };
      await this.sessionsRepository.save(session);
    } catch (error) {
      throw new InternalServerErrorException('Unable to create user session');
    }

    const sessionToken = this.sessionJwtService.sign({
      id: user.id,
      phoneNumber: user.phoneNumber,
      phoneCode: user.phoneCode,
    });

    const refreshToken = this.refreshJwtService.sign({
      id: user.id,
      sessionId,
    });

    return {
      sessionToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto, deviceInfo: string): Promise<TokenResponse> {
    const { phoneNumber, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { phoneNumber } });
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const sessionId = v4();
    if (deviceInfo === 'Unknown')
      throw new UnauthorizedException('Invalid device');

    const session = {
      id: sessionId,
      user: user,
      deviceInfo,
    };

    try {
      await this.sessionsRepository.save(session);
    } catch (error) {
      throw new InternalServerErrorException('Unable to create user session');
    }

    const refreshToken = this.sessionJwtService.sign({
      id: user.id,
      sessionId,
    });

    const sessionToken = this.refreshJwtService.sign({
      id: user.id,
      phoneNumber: user.phoneNumber,
      phoneCode: user.phoneCode,
    });
    return {
      sessionToken,
      refreshToken,
    };
  }

  async logout(sessionToken: string): Promise<void> {
    const session = await this.sessionsRepository.findOne({
      where: { id: sessionToken },
    });
    if (!session) throw new NotFoundException('Session not found');

    await this.sessionsRepository.softDelete(session);
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Validate the refreshToken
      const payload = this.refreshJwtService.verify(refreshToken);

      // Fetch user from the database using the payload info (like user ID)
      const user = await this.usersRepository.findOne({
        where: { id: payload.id },
      });
      if (!user) {
        console.error('User not found');
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new authToken (and optionally refreshToken)
      const newAuthToken = this.sessionJwtService.sign({
        id: user.id,
        phoneNumber: user.phoneNumber,
        phoneCode: user.phoneCode,
      });

      // Optionally generate a new refreshToken if you want to rotate it
      const newRefreshToken = this.refreshJwtService.sign({
        id: user.id,
        sessionId: payload.sessionId,
      });

      return { authToken: newAuthToken, refreshToken: newRefreshToken };
    } catch (e) {
      console.error('Error refreshing token', e);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}

class TokenResponse {
  sessionToken: string;
  refreshToken: string;
}
