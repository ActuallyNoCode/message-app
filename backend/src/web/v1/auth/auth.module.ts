import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { LocalStrategy } from 'src/services/strategies/auth.local.strategy';
import { JwtStrategy } from 'src/services/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT.secret,
      signOptions: { expiresIn: config.JWT.expiresIn },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
