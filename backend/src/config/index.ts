import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { join } from 'path';

interface JwtOptions {
  secret: string;
  expiresIn: string;
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
  },
  JWT: {
    secret: process.env.JWT_SECRET ?? 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  },
};
