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
import { Chat } from './chats.entity';

@Entity()
export class User {
  @ApiProperty({
    example: '1ef8b5e6-0be1-44a6-9277-e352225f27ec',
    description: 'v4 UUID for the user',
  })
  @Column({ primary: true })
  id: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'The username of the user',
  })
  @Column()
  username: string;

  @ApiProperty({
    example: '$2y$10$72roN/8ohBCNsz/clNWs9eeau9KczfZjuXbLVxMlQbT6FqsgWR0zW',
    description:
      'The password of the user - hashed with bcrypt - Original: 123456789',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: '123456789',
    description: 'The phone number of the user',
  })
  @Column({ unique: true })
  phoneNumber: string;

  @ApiProperty({
    example: '+57',
    description: 'The phone code of the user',
  })
  @Column()
  phoneCode: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'The profile picture of the user',
  })
  @Column({ nullable: true })
  profilePicture: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;

  //RELATIONS: Message (one-to-many), Chat (many-to-many) and Country (many-to-one)
  /*   @ApiProperty({
    example: '1ef8b5e6-0be1-44a6-9277-e352225f27ec',
    description: 'v4 UUID for the country',
  })
  @ManyToOne(() => Country, (country: Country) => country.id)
  @JoinColumn()
  country: Country; */

  @OneToMany(() => Message, (message: Message) => message.senderId)
  messages: Message[];

  @ManyToMany(() => Chat, (chat: Chat) => chat.users)
  chats: Chat[];
}
