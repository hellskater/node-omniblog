import { SECRET_KEY } from '@/config';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const getUserIdFromRequest = (req: Request): string => {
  const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
  const decoded = verify(Authorization, SECRET_KEY) as DataStoredInToken;
  return decoded._id;
};
