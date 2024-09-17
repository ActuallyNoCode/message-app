import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from 'src/services/guards/jwt.guard';
import { CreateChatDto } from './dto/create-chat.dto';
import { Request as Req } from 'express';
import { User } from 'src/entities/users.entity';
import { UpdateChatDto } from './dto/update-chat.dto';
import {
  chatsControllerDocs,
  createChatDocs,
  deleteChatDocs,
  getChatByIdDocs,
  getChatsDocs,
  updateChatDocs,
} from 'src/services/swagger/decorators/chats.decorator';

@chatsControllerDocs()
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @getChatByIdDocs()
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getChat(@Param('id') id: string, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.getChatById(id, userId);
  }

  @Get()
  @getChatsDocs()
  @UseGuards(JwtAuthGuard)
  getChats(
    @Request() req: Req,
    @Query('chatPage') chatPage: number = 1,
    @Query('chatLimit') chatLimit: number = 10,
    @Query('messagePage') messagePage: number = 1,
    @Query('messageLimit') messageLimit: number = 30,
  ) {
    const user = req.user as User;
    const userId = user.id;

    return this.chatsService.getChats(
      userId,
      chatPage,
      chatLimit,
      messagePage,
      messageLimit,
    );
  }

  @createChatDocs()
  @Post()
  @UseGuards(JwtAuthGuard)
  createChat(@Body() createChatDto: CreateChatDto, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.createChat(createChatDto, userId);
  }

  @updateChatDocs()
  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateChat(
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
    @Request() req: Req,
  ) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.updateChat(id, updateChatDto, userId);
  }

  @deleteChatDocs()
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteChat(@Param('id') id: string, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.deleteChat(id, userId);
  }
}
