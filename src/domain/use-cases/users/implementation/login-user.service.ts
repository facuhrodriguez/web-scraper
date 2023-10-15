import {
  UserAuthenticated,
  User,
  IGetUserRepository,
  UserNotExist,
  VERIFY_USER_REPOSITORY,
  HASH_COMPARE_REPOSITORY,
  IHashCompare,
  ENCRYPTER,
  IEncrypt,
  IncorrectUserPassword,
  UserLogin,
} from '@/domain/models';
import { Adapter } from '@tsclean/core';
import { ILoginUser } from '@/domain/use-cases';
export const LOGIN_SERVICE = 'LOGIN_SERVICE';

export class LoginUserService implements ILoginUser {
  constructor(
    @Adapter(VERIFY_USER_REPOSITORY) private readonly verifyUser: IGetUserRepository,
    @Adapter(HASH_COMPARE_REPOSITORY) private readonly compareHash: IHashCompare,
    @Adapter(ENCRYPTER) private readonly encrypter: IEncrypt,
  ) {}

  async login(userToLogin: UserLogin): Promise<UserAuthenticated> {
    const userExists: User | null = await this.verifyUser.getUserByUsername(userToLogin.userName);

    if (!userExists) throw new UserNotExist(`User ${userToLogin.userName} does not exist`);

    const isValidPassword: boolean = await this.compareHash.compare(
      userToLogin.password,
      userExists.password,
    );

    if (!isValidPassword) throw new IncorrectUserPassword(`Invalid user password`);

    const userPayload = {
      user: {
        userName: userExists.userName,
      },
    };

    const userToken: string = this.encrypter.encrypt(userPayload);

    return { accessToken: userToken, userName: userExists.userName };
  }
}
