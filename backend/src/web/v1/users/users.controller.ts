import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/services/guards/jwt.guard';
import {
  deleteUserDocs,
  getUserByIdDocs,
  getUserByPhoneNumberDocs,
  getUserByUsernameDocs,
  getUsersDocs,
  updateUserDocs,
  usersControllerDocs,
} from 'src/services/swagger/decorators/users.decorator';
import { updateUserDto } from './dto/update-user.dto';
import { Request as Req } from 'express';
import { User } from 'src/entities/users.entity';

@usersControllerDocs()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @getUsersDocs()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  @getUserByIdDocs()
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Get('/username/:username')
  @getUserByUsernameDocs()
  @UseGuards(JwtAuthGuard)
  async getUserByUsername(@Param('username') username: string) {
    return await this.usersService.getUsersByUsername(username);
  }

  @Get('/phone/:phoneNumber')
  @getUserByPhoneNumberDocs()
  @UseGuards(JwtAuthGuard)
  async getUserByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return await this.usersService.getUsersByPhoneNumber(phoneNumber);
  }

  @Patch('/:id')
  @updateUserDocs()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() data: updateUserDto,
    @Request() req: Req,
  ) {
    if ((req.user as User).id !== id) {
      throw new UnauthorizedException(
        "You don't have permission to update this user",
      );
    }
    return await this.usersService.updateUser(id, data);
  }

  @Delete('/:id')
  @deleteUserDocs()
  @UseGuards(JwtAuthGuard)
  async softDeleteUser(@Param('id') id: string, @Request() req: Req) {
    console.log(req.user as User);
    if ((req.user as User).id !== id) {
      throw new UnauthorizedException(
        "You don't have permission to update this user",
      );
    }
    return await this.usersService.softDeleteUser(id);
  }
}
