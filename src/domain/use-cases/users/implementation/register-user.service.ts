import { HASH_REPOSITORY, IHashRepository } from '@/domain/models/gateways/hash-content';
import { Adapter, Service } from '@tsclean/core';
import { User } from '@/domain/models/user';
import { IRegisterUser } from '@/domain/use-cases/users/register-user-service';
import {
  ADD_USER_REPOSITORY,
  IAddUserRepository,
} from '@/domain/models/gateways/users/add-user.repository';
import {
  ICheckEmailRepository,
  VERIFY_USER_REPOSITORY,
} from '@/domain/models/gateways/users/verify-user-exist.repository';
import { UserAlreadyExistsError } from '@/domain/models/gateways/users/errors/user-already-exists.error';

@Service()
export class RegisterUserService implements IRegisterUser {
  constructor(
    @Adapter(HASH_REPOSITORY) private readonly hashRepo: IHashRepository,
    @Adapter(ADD_USER_REPOSITORY) private readonly addUser: IAddUserRepository,
    @Adapter(VERIFY_USER_REPOSITORY) private readonly verifyUser: ICheckEmailRepository,
  ) {}

  async register(userData: User): Promise<User> {
    const existUser: User = await this.verifyUser.getUserByUsername(userData.userName);
    if (existUser)
      throw new UserAlreadyExistsError(`User already exist with the userName ${userData.userName}`);
    const encryptedPassword: string = await this.hashRepo.hash(userData.password);
    return this.addUser.addUserRepository({ ...userData, password: encryptedPassword });
  }
}
