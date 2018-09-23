import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { getCurrentConfig } from '../config/config';
import { Editor } from '../generated';
import { OAuthToken } from './auth-token.model';

export const tokenService = {
  sign: async (editor: Editor) => {
    // const profile: OAuthToken = jwtDecode(idToken);
    const token: OAuthToken = {
      unique_name: editor.displayName,
      nameid: `${editor._id}`,
      sub: `${editor.displayName}`,
      expiresIn: '',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 120
    };
    return jwt.sign(token, getCurrentConfig().auth.tokenSecret)
  },
  verify: (token: string) => {
    return jwt.verify(token, getCurrentConfig().auth.tokenSecret) as OAuthToken;
  },
};
