import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/messages.entity';
import { Equal, ILike, Not, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { v4 } from 'uuid';
import { MessageStatus } from 'src/constants/types';
import { User } from 'src/entities/users.entity';
import { Chat } from 'src/entities/chats.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async getMessage(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async getMessageByContent(content: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { content: ILike(`%${content}%`), deletedAt: null },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async getMessagesByContentInChat(
    content: string,
    chatId: string,
  ): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        content: ILike(`%${content}%`),
        chatId: Equal(chatId),
        deletedAt: null,
      },
    });
  }

  async getMessagesWithMedia(): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { media: Not(null), deletedAt: null },
    });
  }

  async createMessage(
    messageDto: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    const id = v4();
    const status = MessageStatus.SENT;
    const { chatId } = messageDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const chat = await this.chatRepository.findOne({
      where: { id: chatId },
    });

    if (!user || !chat) {
      throw new NotFoundException('User or Chat not found');
    }

    if (!chat.users.find((u) => u.id === user.id)) {
      throw new ForbiddenException('User is not part of the chat');
    }

    const message = this.messageRepository.create({
      ...messageDto,
      id,
      status,
      senderId: user,
      chatId: chat,
    });

    return await this.messageRepository.save(message);
  }

  async updateMessage(
    id: string,
    message: UpdateMessageDto,
    userId: string,
  ): Promise<Message> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const existingMessage = await this.messageRepository.findOne({
      where: { id },
    });

    if (!user || !existingMessage) {
      throw new NotFoundException('User or Message not found');
    }

    if (existingMessage.senderId.id !== user.id) {
      throw new ForbiddenException('User is not the sender of the message');
    }

    await this.messageRepository.update({ id }, message);

    const updatedMessage = await this.messageRepository.findOne({
      where: { id },
    });

    if (!updatedMessage) {
      throw new NotFoundException('Message not found');
    }

    return updatedMessage;
  }

  async deleteMessage(id: string, userId: string): Promise<Message> {
    // check if the user is the sender of the message
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const existingMessage = await this.messageRepository.findOne({
      where: { id },
    });

    if (!user || !existingMessage) {
      throw new NotFoundException('User or Message not found');
    }

    if (existingMessage.senderId.id !== user.id) {
      throw new ForbiddenException('User is not the sender of the message');
    }

    await this.messageRepository.softDelete({ id });

    const deletedMessage = await this.messageRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!deletedMessage) {
      throw new NotFoundException('Message not found');
    }

    return deletedMessage;
  }
}
