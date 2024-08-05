import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'User ID',
    type: 'string',
    example: 'd6b9f4e0-1b4d-11ec-82a8-0242ac130003',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'Chat name',
    type: 'string',
    example: 'My chat',
  })
  @IsNotEmpty()
  name: string;
}
