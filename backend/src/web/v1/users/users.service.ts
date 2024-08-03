import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  testRoute() {
    return 'Hello World';
  }

  async getUsers() {
    return await this.usersRepository.find();
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async createUser(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = {
      ...userDto,
      password: hashedPassword,
    };
    try {
      const savedUser = await this.usersRepository.save(user);
    } catch (error) {}
  }
}
