import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/messages.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { User } from 'src/entities/users.entity';
import { Chat } from 'src/entities/chats.entity';
import { ChatsService } from '../chats/chats.service';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, Chat])],
  controllers: [MessagesController],
  providers: [MessagesService, ChatsService, MessagesGateway],
})
export class MessagesModule {}
