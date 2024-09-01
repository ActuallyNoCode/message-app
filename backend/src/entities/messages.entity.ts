import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Chat } from './chats.entity';

/* 
  MODEL FIELD DEFINITIONS:
  - id: string
  - content: string
  - status: string
  - media: string
  - createdAt: Date
  - updatedAt: Date
  - deletedAt: Date
*/

@Entity()
export class Message {
  @ApiProperty({
    example: '1ef8b5e6-0be1-44a6-9277-e352225f27ec',
    description: 'v4 UUID for the message',
  })
  @Column({ primary: true })
  id: string;

  @ApiProperty({
    example: 'Hello, World!',
    description: 'The content of the message',
  })
  @Column()
  content: string;

  @ApiProperty({
    example: 'sent',
    format: 'sent | received | read',
    description: 'The status of the message',
  })
  @Column()
  status: string;

  @ApiProperty({
    example: 'https://example.com/media.jpg',
    description: 'The media URL of the message / Provider: Cloudinary',
  })
  @Column()
  media: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  //RELATIONS: User (many-to-one) and chat (many-to-one)
  @ManyToOne(() => User, (user: User) => user.messages, { cascade: true })
  @JoinColumn()
  senderId: User;

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages, { cascade: true })
  @JoinColumn()
  chatId: Chat;
}
