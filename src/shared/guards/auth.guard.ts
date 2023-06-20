import { BaseHttpException } from './../exceptions/base-http-exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UserService } from '../../user/user.service';
import { getAuthToken } from '../utilities/token.util';
import { RequestContext } from '../interfaces/request-context.interface';
import { LANGUAGE } from '../constants/lang.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.lang =
      (request.headers?.['accept-language'] as string) ?? LANGUAGE.EN;
    const token = getAuthToken(request.headers);
    if (!token) throw new BaseHttpException(600);
    const { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.userService.findUserById(userId);
    if (!user) throw new BaseHttpException(600);
    request.user = user;
    return true;
  }
}
