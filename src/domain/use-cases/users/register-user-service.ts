import { RegisterUserParams, User } from '@/domain/models';
export interface IRegisterUser {
  register: (user: RegisterUserParams) => Promise<User>;
}
