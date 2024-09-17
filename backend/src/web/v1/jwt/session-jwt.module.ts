import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT.sessionSecret,
      signOptions: { expiresIn: config.JWT.sessionExpiresIn },
    }),
  ],
  exports: [JwtModule],
})
export class SessionJwtModule {}
