import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'Admins of the chat Ids - has to be in the users list',
    type: 'string',
    example: [
      '056eb5b8-d4cd-486b-8a3d-22b3a9304c0e',
      '1afe2c66-4572-421c-bf28-8ddb175ece00',
    ],
  })
  adminIds: string[];

  @ApiProperty({
    description: 'Participants of the chat Ids',
    type: 'string',
    example: [
      '056eb5b8-d4cd-486b-8a3d-22b3a9304c0e',
      '1afe2c66-4572-421c-bf28-8ddb175ece00',
      '5d5c2a23-b8bc-4522-a292-1a2bf7b3ca81',
    ],
  })
  @IsNotEmpty()
  users: string[];

  @ApiProperty({
    description: 'Chat name',
    type: 'string',
    example: 'My chat',
  })
  @IsNotEmpty()
  name: string;
}

export class createChatResponse {
  message: string;
  data: {
    id: string;
    name: string;
  };
}
