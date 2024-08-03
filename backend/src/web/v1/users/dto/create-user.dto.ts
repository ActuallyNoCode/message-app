import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(15)
  readonly phoneNumber: string;

  @IsString()
  @IsOptional()
  readonly profilePicture?: string;

  @IsString()
  @IsNotEmpty()
  readonly phoneCode: string;
}
