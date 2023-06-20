import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@ValidatorConstraint({ async: true })
@Injectable()
export class DuplicateEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail({ email });
    if (user) return false;
    return true;
  }

  defaultMessage() {
    return 'this email already is registered';
  }
}
export function IsDuplicateEmail(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DuplicateEmailValidator,
    });
  };
}
