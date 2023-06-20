import { Transform } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';
import { IsExistingUser } from '../validators/is-existing-user.validator';
import { IsCorrectPassword } from '../validators/is-correct-password.validator';

export class AuthDto {
  @IsExistingUser()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsCorrectPassword()
  @MaxLength(255)
  password?: string;
}
