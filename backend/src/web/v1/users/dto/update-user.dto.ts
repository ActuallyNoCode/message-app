import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'User username', example: 'username' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ description: 'User password', example: '123456789' })
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '1234567890',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(7)
  @MaxLength(15)
  @IsOptional()
  readonly phoneNumber?: string;

  @ApiProperty({ description: 'User phone code', example: '+57' })
  @IsString()
  @MinLength(1)
  @MaxLength(5)
  @IsOptional()
  readonly phoneCode?: string;

  @ApiProperty({
    description: 'User profile picture',
    example: 'https://example.com/profile.jpg',
  })
  @IsString()
  @IsOptional()
  readonly profilePicture?: string;
}
