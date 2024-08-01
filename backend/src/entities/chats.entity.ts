import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './messages.entity';
import { User } from './users.entity';

@Entity()
export class Chat {
  @ApiProperty({
    example: '1ef8b5e6-0be1-44a6-9277-e352225f27ec',
    description: 'v4 UUID for the chat',
  })
  @Column({ primary: true })
  id: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  //RELATIONS: User (many-to-many) and Message (one-to-many)
  @OneToMany(() => Message, (message: Message) => message.chatId)
  messages: Message[];

  @ManyToMany(() => User, (user: User) => user.chats)
  users: User[];
}
