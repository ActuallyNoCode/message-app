import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Param,
  Patch,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request as Req } from 'express';
import { JwtAuthGuard } from 'src/services/guards/jwt.guard';
import { User } from 'src/entities/users.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from 'src/entities/messages.entity';
import { ChatsService } from '../chats/chats.service';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly chatsService: ChatsService,
  ) {}

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.getMessage(id);
  }

  @Get('/content/:content')
  getMessageByContent(@Param('content') content: string) {
    return this.messagesService.getMessageByContent(content);
  }

  @Get('/:chatId/messages/search')
  @UseGuards(JwtAuthGuard)
  async getMessagesByContent(
    @Param('chatId') chatId: string,
    @Query('content') content: string,
    @Request() req: Req,
  ): Promise<Message[]> {
    const user = req.user as User;
    const userId = user.id;

    // check if the user is a member of the chat
    const chat = await this.chatsService.getChatById(chatId, userId);
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }

    return this.messagesService.getMessagesByContentInChat(content, chatId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(@Body() messageDto: CreateMessageDto, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.messagesService.createMessage(messageDto, userId);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateMessage(
    @Param('id') id: string,
    @Body() messageDto: UpdateMessageDto,
    @Request() req: Req,
  ) {
    const user = req.user as User;
    const userId = user.id;
    return this.messagesService.updateMessage(id, messageDto, userId);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteMessage(@Param('id') id: string, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.messagesService.deleteMessage(id, userId);
  }
}
