import { UserSchema } from '@/infrastructure/driven-adapters/adapters/orm/mongoose/schemas/user.schema';
import { IAddUserRepository } from '@/domain/models/gateways/users/add-user.repository';
import { RegisterUserParams, User } from '@/domain/models/user';
import { IGetUserRepository } from '@/domain/models/gateways/users/verify-user-exist.repository';

export class UserMongooseRepository implements IAddUserRepository, IGetUserRepository {
  async addUserRepository(userData: RegisterUserParams): Promise<User> {
    return UserSchema.create(userData);
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    const userAccount: User | null = await UserSchema.findOne({ userName }).exec();
    return userAccount && this.map(userAccount);
  }

  private map(data: User): User {
    const { userName, password, createdAt } = data;
    return Object.assign(
      {},
      {
        _id: data._id,
        userName,
        password,
        createdAt,
      },
    );
  }
}
