import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { ServerConfig } from '../server-config.model';
import { AuthToken } from '@refract-cms/core';

class AuthService {
  createAccessToken(userId: string, { auth }: ServerConfig) {
    const token: AuthToken = {
      nameid: '',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 120,
      iss: auth.jwt.issuer || 'refract-cms',
      aud: 'refract-cms'
    };
    return jwt.sign(token, auth.jwt.secret);
  }

  verifyAccessToken(token: string, { auth }: ServerConfig) {
    return jwt.verify(token, auth.jwt.secret) as AuthToken;
  }

  findUserIdWithCredentials(username: string, password: string, { auth }: ServerConfig): string | null {
    if (auth.adminCredentials.username === username && auth.adminCredentials.password === password) {
      return 'ADMIN';
    }
    return null;
  }
}

export const authService = new AuthService();
