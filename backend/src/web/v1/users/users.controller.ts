import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Return user by id' })
  async getUserById(id: string) {
    return await this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, description: 'User created' })
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }
}
