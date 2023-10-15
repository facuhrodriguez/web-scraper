import {
  INTERNAL_SERVER_ERROR,
  RegisterUserParams,
  User,
  UserAlreadyExistsError,
} from '@/domain/models';

import { REGISTER_SERVICE, IRegisterUser } from '@/domain/use-cases';
import { Adapter, Body, HttpException, Mapping, Post } from '@tsclean/core';

@Mapping('api/v1/users/register')
export class RegisterController {
  constructor(@Adapter(REGISTER_SERVICE) private readonly registerService: IRegisterUser) {}

  @Post()
  async register(@Body() userData: RegisterUserParams): Promise<User | HttpException> {
    try {
      const newUser: User = await this.registerService.register(userData);
      return newUser;
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) return new HttpException(error.message, 400);
      return new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }
}
