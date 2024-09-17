import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateChatDto, createChatResponse } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/entities/chats.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { User } from 'src/entities/users.entity';
import { UpdateChatDto, updateChatResponse } from './dto/update-chat.dto';
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
      where: { id },
      relations: ['users', 'messages'],
      select: {
        users: {
          id: true,
          username: true,
          phoneNumber: true,
          phoneCode: true,
          profilePicture: true,
        },
      },
    });

    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    // Check if the user is part of the chat
    const isUserInChat = chat.users.some((u) => u.id === userId);
    if (!isUserInChat) {
      throw new NotFoundException(
        `User with ID ${userId} is not part of the chat`,
      );
    }

    return chat;
  }

  async getChats(
    userId: string,
    chatPage: number = 1,
    chatLimit: number = 10,
    messagePage: number = 1,
    messageLimit: number = 1,
  ): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const skipChats = (chatPage - 1) * chatLimit;

    const chats = await this.chatRepository.find({
      where: { users: { id: userId } },
      relations: ['messages'],
      take: chatLimit, // Limit the number of chats
      skip: skipChats, // Skip chats based on page
    });

    const chatsWithPaginatedMessages = chats.map((chat) => {
      const skipMessages = (messagePage - 1) * messageLimit;
      const paginatedMessages = chat.messages.slice(
        skipMessages,
        skipMessages + messageLimit,
      ); // Paginate messages

      return {
        ...chat,
        messages: paginatedMessages,
      };
    });

    return chatsWithPaginatedMessages;
  }

  async createChat(
    createChatDto: CreateChatDto,
    userId: string,
  ): Promise<createChatResponse> {
    const id = v4();

    // Add userId to the users list
    createChatDto.users.push(userId);

    // Add userId to the adminIds list
    createChatDto.adminIds.push(userId);

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

    const chat = this.chatRepository.create({
      id,
      users,
      ownerId: userId,
      name: createChatDto.name,
      adminIds: createChatDto.adminIds,
    });

    const savedChat = await this.chatRepository.save(chat);

    return {
      message: 'Chat created successfully',
      data: { id: savedChat.id, name: savedChat.name },
    };
  }

  async updateChat(
    id: string,
    chatDto: UpdateChatDto,
    userId: string,
  ): Promise<updateChatResponse> {
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

    const savedChat = await this.chatRepository.save(chat);

    return {
      message: 'Chat updated successfully',
      data: { id: savedChat.id, name: savedChat.name },
    };
  }

  async deleteChat(id: string, userId: string): Promise<deleteChatResponse> {
    const chat = await this.chatRepository.findOne({ where: { id } });
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }

    if (chat.adminIds && !chat.adminIds.includes(userId)) {
      throw new ForbiddenException('User is not an admin');
    }

    await this.chatRepository.softDelete({ id });
    return { message: 'Chat deleted successfully', data: { deletedId: id } };
  }
}

export class deleteChatResponse {
  message: string;
  data: { deletedId: string };
}
