import {
  ICheckEmailRepository,
  VERIFY_USER_REPOSITORY,
} from '@/domain/models/gateways/users/verify-user-exist.repository';
import { User } from '@/domain/models/user';
import { UserAuthenticated } from '@/domain/models/user-authenticated';
import { Adapter } from '@tsclean/core';
import { ILoginUser } from '@/domain/use-cases/users/login-user-service';
import { UserNotExist } from '@/domain/models/gateways/users/errors/user-not-exist';
import { HASH_COMPARE_REPOSITORY, IHashCompare } from '@/domain/models/gateways/hash-compare';
import { ENCRYPTER, IEncrypt } from '@/domain/models/gateways/encrypter';
import { IncorrectUserPassword } from '@/domain/models/gateways/users/errors/incorrect-password.error';

export class LoginUserService implements ILoginUser {
  constructor(
    @Adapter(VERIFY_USER_REPOSITORY) private readonly verifyUser: ICheckEmailRepository,
    @Adapter(HASH_COMPARE_REPOSITORY) private readonly compareHash: IHashCompare,
    @Adapter(ENCRYPTER) private readonly encrypter: IEncrypt,
  ) {}

  async login(userToLogin: User): Promise<UserAuthenticated> {
    const userExists: User = await this.verifyUser.getUserByUsername(userToLogin.userName);
    if (!userExists) throw new UserNotExist(`User ${userToLogin.userName} does not exist`);

    const isValidPassword: boolean = await this.compareHash.compare(
      userExists.password,
      userToLogin.password,
    );

    if (!isValidPassword) throw new IncorrectUserPassword(`Invalid user password`);

    const userPayload = {
      user: {
        id: userExists.id,
        userName: userExists.userName,
      },
    };

    const userToken: string = this.encrypter.encrypt(userPayload);

    return { accessToken: userToken, id: userExists.id, userName: userExists.userName };
  }
}
