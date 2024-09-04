import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAuthGuard } from 'src/services/guards/jwt.guard';
import { CreateChatDto } from './dto/create-chat.dto';
import { Request as Req } from 'express';
import { User } from 'src/entities/users.entity';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getChat(@Param('id') id: string, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.getChatById(id, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getChats(@Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.getChats(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createChat(@Body() createChatDto: CreateChatDto, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.createChat(createChatDto, userId);
  }

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

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteChat(@Param('id') id: string, @Request() req: Req) {
    const user = req.user as User;
    const userId = user.id;
    return this.chatsService.deleteChat(id, userId);
  }
}
