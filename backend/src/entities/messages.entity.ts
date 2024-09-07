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
  @Column({
    nullable: true,
  })
  media: string | null;

  @ApiProperty({
    example: 'audio/mp3',
    format:
      'audio/mp3 | video/mp4 | image/jpeg | image/png | image/gif | application/pdf | application/msword | application/vnd.ms-excel | application/vnd.ms-powerpoint | application/zip | application/x-rar-compressed | application/x-7z-compressed | application/octet-stream',
    description: 'The media type of the message',
  })
  @Column({
    nullable: true,
  })
  mediaType: string | null;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  //RELATIONS: User (many-to-one) and chat (many-to-one)
  @ManyToOne(() => User, (user: User) => user.messages, { cascade: true })
  @JoinColumn({
    name: 'senderId',
  })
  senderId: User;

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages, { cascade: true })
  @JoinColumn({
    name: 'chatId',
  })
  chatId: Chat;
}
