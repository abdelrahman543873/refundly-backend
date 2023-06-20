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
export class ExistingUserValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail({ email });
    if (!user) return false;
    return true;
  }

  defaultMessage() {
    return "this email doesn't exist";
  }
}
export function IsExistingUser(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ExistingUserValidator,
    });
  };
}
