import { Request } from 'express';
import { User } from '../../user/user.entity';
import { LANGUAGE } from '../constants/lang.enum';
export interface RequestContext extends Request {
  user?: User;
  lang: LANGUAGE | string;
}
