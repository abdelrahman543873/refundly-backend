import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';
import { bcryptCheckPass } from '../../shared/utilities/bcryptHelper.util';

@ValidatorConstraint({ name: 'LeaveTypeValidator', async: true })
@Injectable()
export class CorrectPasswordValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}
  async validate(
    password: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const email = validationArguments.object['email'];
    const user = await this.userRepository.findUserByEmail({ email });
    if (!user) return true;
    const passwordValidation = await bcryptCheckPass(password, user.password);
    if (!passwordValidation) return false;
    return true;
  }

  defaultMessage() {
    return 'this password is incorrect';
  }
}
export function IsCorrectPassword(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CorrectPasswordValidator,
    });
  };
}
