import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MessageMediaType } from 'src/constants/types';

export class CreateMessageDto {
  @ApiProperty({ description: 'Message content', example: 'Hello, world!' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly content: string;

  @ApiProperty({
    description: "Link of the message's media",
    example: 'https://www.examplesite.com',
  })
  @IsString()
  @IsOptional()
  readonly media?: string;

  @IsEnum(MessageMediaType)
  @ApiProperty({
    description: "Type of the message's media",
    example: 'image/jpeg',
  })
  @IsOptional()
  readonly mediaType?: MessageMediaType;

  @ApiProperty({
    description: 'the Chat that Message is in',
    example: 'PachoTeam',
  })
  @IsString()
  @Length(36)
  readonly chatId: string;
}
