import { JWT_SECRET } from '@/application/configuration/environment';
import { IEncrypt } from '@/domain/models/gateways/encrypter';
import jwt from 'jsonwebtoken';

export class JWTAdapter implements IEncrypt {
  encrypt(text: object): string {
    return jwt.sign(text, JWT_SECRET, {
      expiresIn: '1d',
    });
  }
}
