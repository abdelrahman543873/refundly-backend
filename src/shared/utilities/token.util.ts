import { sign } from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';

export const getAuthToken = (req: IncomingHttpHeaders): string => {
  if (req?.authorization || req?.Authorization) {
    let auth: string;
    if (req.authorization) auth = req.authorization;
    if (req.Authorization) auth = <string>req.Authorization;
    return auth.split(' ')[1];
  }
  return null;
};

export const generateAuthToken = (userId: number): string => {
  return sign({ userId }, process.env.JWT_SECRET);
};
