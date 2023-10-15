import {
  IncorrectUserPassword,
  UserAuthenticated,
  UserLogin,
  UserNotExist,
  INTERNAL_SERVER_ERROR,
} from '@/domain/models';

import { ILoginUser, LOGIN_SERVICE } from '@/domain/use-cases';
import { Adapter, Body, HttpException, Mapping, Post } from '@tsclean/core';

@Mapping('api/v1/users/login')
export class LoginController {
  constructor(@Adapter(LOGIN_SERVICE) private readonly loginUserService: ILoginUser) {}

  @Post()
  async login(@Body() data: UserLogin): Promise<UserAuthenticated | HttpException> {
    try {
      const userAuthenticated: UserAuthenticated = await this.loginUserService.login(data);
      return userAuthenticated;
    } catch (error) {
      if (error instanceof UserNotExist) return new HttpException(error.message, 404);
      if (error instanceof IncorrectUserPassword) return new HttpException(error.message, 401);
      return new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }
}
