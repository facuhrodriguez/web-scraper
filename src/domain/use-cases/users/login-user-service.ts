import { User } from '@/domain/models/user';
import { UserAuthenticated } from '@/domain/models/user-authenticated';

export interface ILoginUser {
  login: (user: User) => Promise<UserAuthenticated>;
}
