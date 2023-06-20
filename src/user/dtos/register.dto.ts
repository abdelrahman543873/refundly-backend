import { Transform } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';
import { IsDuplicateEmail } from '../validators/is-duplicate-email.validator';

export class RegisterDto {
  @IsDuplicateEmail()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @MaxLength(255)
  password?: string;
}
