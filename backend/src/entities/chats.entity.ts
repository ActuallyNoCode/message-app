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

  @ApiProperty({
    example: 'My chat',
    description: 'Name of the chat',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '5d5c2a23-b8bc-4522-a292-1a2bf7b3ca81',
    description: 'v4 UUID for the owner of the chat',
  })
  @Column()
  ownerId: string;

  @ApiProperty({
    example: [
      '472f08c3-37b7-472d-a54a-c1d8920704d3',
      'faf9225a-187f-4669-9191-6aada6344b53',
    ],
    description: 'List of v4 UUIDs for the admins of the chat',
  })
  @Column('simple-array')
  adminIds: string[];

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
