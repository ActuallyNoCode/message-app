import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/web/v1/auth/auth.service';
import { LoginDto } from 'src/web/v1/auth/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phoneNumber',
    });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.login(
      { phoneNumber, password } as LoginDto,
      '',
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
