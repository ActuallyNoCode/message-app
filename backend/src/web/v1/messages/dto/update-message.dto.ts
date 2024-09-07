import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MessageMediaType } from 'src/constants/types';

export class UpdateMessageDto {
  @ApiProperty({ description: 'Message content', example: 'Hello, world!' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  @IsOptional()
  readonly content?: string;

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
  readonly mediaType: MessageMediaType;
}
