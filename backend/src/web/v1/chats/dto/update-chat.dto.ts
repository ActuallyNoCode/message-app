import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChatDto } from './create-chat.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Owner of the chat Id',
    type: 'string',
    example: '056eb5b8-d4cd-486b-8a3d-22b3a9304c0e',
  })
  ownerId: string;
}

export interface updateChatResponse {
  message: string;
  data: {
    id: string;
    name: string;
  };
}
