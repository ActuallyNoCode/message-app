import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User phone number', example: '1234567890' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly phoneNumber: string;

  @ApiProperty({ description: 'User password', example: '123456789' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  readonly password: string;
}
