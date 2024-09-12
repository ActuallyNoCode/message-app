import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request as Req, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from 'src/services/guards/auth.local.guard';
import {
  AuthControllerDocs,
  LoginDocs,
  RefreshTokenDocs,
  RegisterDocs,
} from 'src/services/swagger/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/services/guards/jwt.guard';
import { User } from 'src/entities/users.entity';

@AuthControllerDocs()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @RegisterDocs()
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const token = this.authService.register(registerDto);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Set the cookie with the token
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 7 * 60 * 60 * 1000, // Cookie expiry time (7 days)
    });

    return res.send('Registration successful');
  }

  @Post('login')
  @UseGuards(LocalGuard)
  @LoginDocs()
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const token = await this.authService.login(loginDto);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Set the cookie with the token
    res.cookie('authToken', token, {
      maxAge: 24 * 7 * 60 * 60 * 1000, // Cookie expiry time (7 days)
    });

    return res.send('Login successful');
  }

  @Get('refreshToken')
  @UseGuards(JwtAuthGuard)
  @RefreshTokenDocs()
  async refreshToken(@Request() req: Req, @Res() res: Response) {
    const user = req.user as User;
    const token = await this.authService.refreshToken(user.id);

    // Delete the old cookie
    res.clearCookie('authToken');

    // Set the cookie with the token
    res.cookie('authToken', token, {
      maxAge: 24 * 7 * 60 * 60 * 1000, // Cookie expiry time (7 days)
    });

    return res.send('Token refreshed');
  }
}
