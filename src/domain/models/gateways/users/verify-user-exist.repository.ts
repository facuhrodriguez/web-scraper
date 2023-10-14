import { User } from '@/domain/models/user';

export const VERIFY_USER_REPOSITORY = 'VERIFY_USER_REPOSITORY';

export interface ICheckEmailRepository {
  getUserByUsername: (userEmail: string) => Promise<User>;
}
