import { Module } from '@nestjs/common';
import { UsersModule } from './web/v1/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './web/v1/messages/messages.module';
import 'dotenv/config';
import { config } from './config';
import { ChatsModule } from './web/v1/chats/chats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    UsersModule,
    MessagesModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
