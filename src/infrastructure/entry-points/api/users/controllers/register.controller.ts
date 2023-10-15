import {
  INTERNAL_SERVER_ERROR,
  IValidationsRepository,
  RegisterUserParams,
  User,
  UserAlreadyExistsError,
  VALIDATIONS_REPOSITORY,
} from '@/domain/models';

import { REGISTER_SERVICE, IRegisterUser } from '@/domain/use-cases';
import { Adapter, Body, HttpException, Mapping, Post } from '@tsclean/core';

@Mapping('api/v1/users/register')
export class RegisterController {
  constructor(
    @Adapter(REGISTER_SERVICE) private readonly registerService: IRegisterUser,
    @Adapter(VALIDATIONS_REPOSITORY) private readonly validator: IValidationsRepository,
  ) {}

  @Post()
  async register(@Body() userData: RegisterUserParams): Promise<User | HttpException> {
    try {
      const toValidate: string[] = ['userName', 'password'];
      const validation = this.validator.validation(userData, toValidate);
      if (!validation?.isValid && validation?.errors)
        return new HttpException(validation.errors, 400);

      const newUser: User = await this.registerService.register(userData);
      return newUser;
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) return new HttpException(error.message, 400);
      return new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }
}
