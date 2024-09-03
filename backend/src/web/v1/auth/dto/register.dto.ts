import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'User username', example: 'username' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  readonly username: string;

  @ApiProperty({ description: 'User password', example: '123456789' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  readonly password: string;

  @ApiProperty({
    description: 'User phone number',
    example: '1234567890',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(15)
  readonly phoneNumber: string;

  @ApiProperty({ description: 'User phone code', example: '+57' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5)
  readonly phoneCode: string;
}
