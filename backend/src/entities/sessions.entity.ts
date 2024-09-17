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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Session {
  @ApiProperty({
    example: '1ef8b5e6-0be1-44a6-9277-e352225f27ec',
    description: 'v4 UUID for the session',
  })
  @Column({ primary: true })
  id: string;

  @ApiProperty({
    example: 'Firefox | Windows 10 | Desktop',
    description: 'The device used to create the session',
  })
  @Column()
  deviceInfo: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date when the session was created',
  })
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: 'The date when the session expires',
  })
  @DeleteDateColumn()
  expiratesAt: Date;

  //RELATIONS: User (one-to-many)
  @ManyToOne(() => User, (user: User) => user.sessions)
  @JoinColumn()
  user: User;
}
