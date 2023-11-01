import { Secret } from 'jsonwebtoken';
import config from '../config';
import { jwtHelpers } from './jwtHelpers';

type IDecodedToken = {
  email: string;
};

export function getEmailFromAccessToken(accessToken: string): string {
  const decodedToken = jwtHelpers.verifyToken(
    accessToken,
    config.jwt.secret as Secret
  ) as IDecodedToken;

  return decodedToken.email;
}
