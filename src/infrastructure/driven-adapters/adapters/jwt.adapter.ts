import { JWT_SECRET } from '@/application/configuration/environment';
import { IEncrypt } from '@/domain/models/gateways/encrypter';
import { AccessResourceInterface, ExecutionContextInterface } from '@tsclean/core';
import jwt from 'jsonwebtoken';

export class JWTAdapter implements IEncrypt, AccessResourceInterface {
  encrypt(text: object): string {
    return jwt.sign(text, JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  accessResource(context: ExecutionContextInterface): boolean {
    try {
      const request = context.getHttp().getRequest();
      const headers = request.headers;

      const token = headers['authorization'].split(' ')[1];
      if (token) {
        const decode = jwt.verify(token, JWT_SECRET);
        if (decode && decode['user']) {
          request.body['user'] = decode['user'];
          return true;
        }
      }

      return false;
    } catch (e) {
      return false;
    }
  }
}
