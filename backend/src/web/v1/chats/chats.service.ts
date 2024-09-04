import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chats.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { User } from 'src/entities/users.entity';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getChatById(id: string, userId: string): Promise<Chat> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const chat = await this.chatRepository.findOne({
      where: { id, users: { id: userId } },
      relations: ['users', 'messages'],
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found for user`);
    }

    return chat;
  }

  async getChats(userId: string): Promise<Chat[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return await this.chatRepository.find({
      where: { users: { id: userId } },
      relations: ['users', 'messages'],
    });
  }

  async createChat(
    createChatDto: CreateChatDto,
    userId: string,
  ): Promise<Chat> {
    const id = v4();

    const users = await this.userRepository.find({
      where: createChatDto.users.map((id) => ({ id })),
    });

    if (users.length !== createChatDto.users.length) {
      throw new NotFoundException('Some users were not found');
    }

    const adminIdsNotInUsers = createChatDto.adminIds.filter(
      (adminId) => !createChatDto.users.includes(adminId),
    );

    if (adminIdsNotInUsers.length > 0) {
      throw new BadRequestException('Some admins are not in the users list');
    }

    if (!createChatDto.users.includes(userId)) {
      throw new BadRequestException('Owner must be in the users list');
    }

    if (!createChatDto.adminIds.includes(userId)) {
      throw new BadRequestException('Owner must be in the admin list');
    }

    const chat = this.chatRepository.create({
      id,
      users,
      ownerId: userId,
      name: createChatDto.name,
      adminIds: createChatDto.adminIds,
    });

    return await this.chatRepository.save(chat);
  }

  async updateChat(
    id: string,
    chatDto: UpdateChatDto,
    userId: string,
  ): Promise<Chat> {
    if (chatDto.adminIds && !chatDto.adminIds.includes(userId)) {
      throw new ForbiddenException('User is not an admin');
    }

    if (chatDto.users) {
      const users = await this.userRepository.find({
        where: chatDto.users.map((id) => ({ id })),
      });

      if (users.length !== chatDto.users.length) {
        throw new NotFoundException('Some users were not found');
      }
    }

    if (chatDto.adminIds) {
      const adminIdsNotInUsers = chatDto.adminIds.filter(
        (adminId) => !chatDto.users.includes(adminId),
      );

      if (adminIdsNotInUsers.length > 0) {
        throw new BadRequestException('Some admins are not in the users list');
      }
    }

    if (
      chatDto.ownerId &&
      chatDto.users &&
      !chatDto.users.includes(chatDto.ownerId)
    ) {
      throw new BadRequestException('Owner must be in the users list');
    }

    const users = await this.userRepository.find({
      where: chatDto.users.map((id) => ({ id })),
    });

    const chat = await this.chatRepository.preload({
      id,
      ...chatDto,
      users,
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    return await this.chatRepository.save(chat);
  }

  async deleteChat(id: string, userId: string): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    if (chat.adminIds && !chat.adminIds.includes(userId)) {
      throw new ForbiddenException('User is not an admin');
    }

    await this.chatRepository.softDelete({ id });
    return chat;
  }
}
