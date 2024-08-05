import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from 'src/services/guards/auth.local.guard';
import {
  AuthControllerDocs,
  LoginDocs,
  RegisterDocs,
} from 'src/services/swagger/decorators/auth.decorator';

@AuthControllerDocs()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @RegisterDocs()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  @LoginDocs()
  async login(@Body() loginDto: LoginDto) {
    const user = this.authService.login(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
