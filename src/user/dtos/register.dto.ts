import { Transform } from 'class-transformer';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsDuplicateEmail } from '../validators/is-duplicate-email.validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsDuplicateEmail()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @MaxLength(255)
  password?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Allow()
  avatar?: string;
}
