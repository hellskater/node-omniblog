import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  _id: string;
  exp: number;
}

export interface TokenData {
  'access-token': string;
  'access-token-expires-in': string;
  'refresh-token-expires-in': string;
  'refresh-token': string;
}

export interface RequestWithUser extends Request {
  user: User;
}
