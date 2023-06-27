import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../../user/user.enum';

export const HasRoles = (...args: UserRoleEnum[]) => SetMetadata('roles', args);
