import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT.refreshSecret,
      signOptions: { expiresIn: config.JWT.refreshExpiresIn },
    }),
  ],
  exports: [JwtModule],
})
export class RefreshJwtModule {}
