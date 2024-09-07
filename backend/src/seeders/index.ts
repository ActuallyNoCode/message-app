import { runSeeders, SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from '../config';
import { ChatFactory } from './chats.factory';
import { UserFactory } from './users.factory';
import { MessageFactory } from './messages.factory';
import { MainSeeder } from './main.seeder';
import { Logger } from '@nestjs/common';

const options: DataSourceOptions & SeederOptions = {
  ...(config.database as PostgresConnectionOptions),
  factories: [ChatFactory, UserFactory, MessageFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
const logger = new Logger('Seeder');

logger.log('Initializing database...');
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  logger.log('Data generated successfully');
  logger.log('Exiting...');
  process.exit();
});
