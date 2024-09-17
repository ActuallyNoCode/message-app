import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chats.entity';
import { User } from 'src/entities/users.entity';
import { Session } from 'src/entities/sessions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Session])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
