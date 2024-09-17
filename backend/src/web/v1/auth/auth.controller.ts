import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  AuthControllerDocs,
  LoginDocs,
  RegisterDocs,
} from 'src/services/swagger/decorators/auth.decorator';
import * as UAParser from 'ua-parser-js';
import { JwtAuthGuard } from 'src/services/guards/jwt.guard';

@AuthControllerDocs()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private getDeviceInfo(req: Request): string {
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    const deviceInfo = `${result.os.name} - ${result.browser.name} - ${result.device.type ?? 'Desktop'}`;
    return deviceInfo;
  }

  @Post('register')
  @RegisterDocs()
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const deviceInfo = this.getDeviceInfo(req);
    const { sessionToken, refreshToken } = await this.authService.register(
      registerDto,
      deviceInfo,
    );
    if (!sessionToken) throw new UnauthorizedException('Invalid credentials');

    // Set the cookies with the token
    res.cookie('authToken', sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 15 * 1000, // Cookie expiry time (15 min)
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 30 * 60 * 60 * 1000, // Cookie expiry time (30 days)
    });

    return res.send('Registration successful');
  }

  @Post('login')
  @LoginDocs()
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const deviceInfo = this.getDeviceInfo(req);
    const { refreshToken, sessionToken } = await this.authService.login(
      loginDto,
      deviceInfo,
    );
    if (!sessionToken) throw new UnauthorizedException('Invalid credentials');

    // Set the cookie with the token
    res.cookie('authToken', sessionToken, {
      httpOnly: true,
      secure: true, // Should be secure in production
      sameSite: 'none', // Allow cross-site requests
      maxAge: 60 * 15 * 1000, // Cookie expiry time (15 min)
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 30 * 60 * 60 * 1000, // Cookie expiry time (30 days)
    });

    return res.send('Login successful');
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('authToken');
    res.clearCookie('refreshToken');
    return res.send('Logout successful');
  }

  @Get('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Req() req: Request) {
    // extract refreshToken from authorization header
    const refreshToken = req.headers['authorization']?.split(' ')[1];
    return await this.authService.refreshTokens(refreshToken);
  }
}
