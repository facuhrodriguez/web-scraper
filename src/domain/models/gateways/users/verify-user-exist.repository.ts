import { User } from '@/domain/models/user';

export const VERIFY_USER_REPOSITORY = 'VERIFY_USER_REPOSITORY';

export interface IGetUserRepository {
  getUserByUsername: (userEmail: string) => Promise<User | null>;
}
