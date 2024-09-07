import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/users.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    const users = await this.usersRepository.find({
      where: {
        deletedAt: null,
      },
    });
    const userList = users.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, createdAt, deletedAt, updatedAt, ...rest }) => rest,
    );
    return userList;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, createdAt, deletedAt, updatedAt, ...rest } = user;
      return rest;
    }

    throw new NotFoundException('User not found');
  }

  async getUsersByUsername(username: string) {
    const users = await this.usersRepository.find({
      where: { username: ILike(`%${username}%`), deletedAt: null },
    });

    const userList = users.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, createdAt, deletedAt, updatedAt, ...rest }) => rest,
    );
    return userList;
  }

  async getUsersByPhoneNumber(phoneNumber: string) {
    const users = await this.usersRepository.find({
      where: { phoneNumber: ILike(`%${phoneNumber}%`), deletedAt: null },
    });

    const userList = users.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, createdAt, deletedAt, updatedAt, ...rest }) => rest,
    );
    return userList;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (user) {
      await this.usersRepository.update({ id }, data);
      return { id, ...data };
    }

    throw new NotFoundException('User not found');
  }

  async softDeleteUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (user) {
      await this.usersRepository.softDelete({ id });
      return { id };
    }

    throw new NotFoundException('User not found');
  }
}
