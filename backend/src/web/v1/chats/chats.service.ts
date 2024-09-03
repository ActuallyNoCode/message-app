import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chats.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    const id = v4();

    const chat = this.chatRepository.create({
      id,
      name: createChatDto.name,
      ownerId: createChatDto.ownerId,
      adminIds: createChatDto.adminIds,
    });

    return await this.chatRepository.save(chat);
  }
}
