import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { LocalStrategy } from 'src/services/strategies/auth.local.strategy';
import { JwtStrategy } from 'src/services/strategies/jwt.strategy';
import { Session } from 'src/entities/sessions.entity';
import { JwtAuthGuard } from 'src/services/guards/jwt.guard';
import { SessionJwtModule } from '../jwt/session-jwt.module';
import { RefreshJwtModule } from '../jwt/refresh-jwt.module';

@Global()
@Module({
  imports: [
    SessionJwtModule,
    RefreshJwtModule,
    TypeOrmModule.forFeature([User, Session]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
