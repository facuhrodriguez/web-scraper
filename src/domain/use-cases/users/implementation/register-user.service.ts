import { HASH_REPOSITORY, IHashRepository } from '@/domain/models/gateways/hash-content';
import { Adapter, Service } from '@tsclean/core';
import { RegisterUserParams, User } from '@/domain/models/user';
import { IRegisterUser } from '@/domain/use-cases/users/register-user-service';
import {
  ADD_USER_REPOSITORY,
  IAddUserRepository,
} from '@/domain/models/gateways/users/add-user.repository';
import {
  IGetUserRepository,
  VERIFY_USER_REPOSITORY,
} from '@/domain/models/gateways/users/verify-user-exist.repository';
import { UserAlreadyExistsError } from '@/domain/models/gateways/users/errors/user-already-exists.error';
export const REGISTER_SERVICE = 'REGISTER_SERVICE';
@Service()
export class RegisterUserService implements IRegisterUser {
  constructor(
    @Adapter(HASH_REPOSITORY) private readonly hashRepo: IHashRepository,
    @Adapter(ADD_USER_REPOSITORY) private readonly addUser: IAddUserRepository,
    @Adapter(VERIFY_USER_REPOSITORY) private readonly verifyUser: IGetUserRepository,
  ) {}

  async register(userData: RegisterUserParams): Promise<User> {
    const existUser: User | null = await this.verifyUser.getUserByUsername(userData.userName);
    if (existUser)
      throw new UserAlreadyExistsError(`User already exist with the userName ${userData.userName}`);
    const encryptedPassword: string = await this.hashRepo.hash(userData.password);
    return this.addUser.addUserRepository({
      ...userData,
      password: encryptedPassword,
    });
  }
}
