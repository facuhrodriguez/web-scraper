import { UserSchema } from '@/infrastructure/driven-adapters/adapters/orm/mongoose/schemas/user.schema';
import { IAddUserRepository } from '@/domain/models/gateways/users/add-user.repository';
import { User } from '@/domain/models/user';

export class UserMongooseRepository implements IAddUserRepository {
  async addUserRepository(userData: User): Promise<User> {
    return UserSchema.create(userData);
  }
}
