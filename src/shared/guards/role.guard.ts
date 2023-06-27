import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestContext } from '../interfaces/request-context.interface';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { UserRoleEnum } from '../../user/user.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRoleEnum[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest<RequestContext>();
    const user = request.user;
    if (!roles.includes(user.role)) {
      throw new BaseHttpException(603);
    }
    return true;
  }
}
