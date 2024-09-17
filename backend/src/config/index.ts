import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { join } from 'path';

interface JwtOptions {
  sessionSecret: string;
  sessionExpiresIn?: string;
  refreshExpiresIn?: string;
  refreshSecret?: string;
}

export const config: { database: TypeOrmModuleOptions; JWT: JwtOptions } = {
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: true,
    retryAttempts: 1,
    ssl: true,
  },
  JWT: {
    sessionSecret: process.env.JWT_SECRET,
    sessionExpiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
