import { User } from '@/domain/models/user';
export interface IRegisterUser {
  register: (user: User) => Promise<User | boolean>;
}
