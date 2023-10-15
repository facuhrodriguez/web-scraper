import { RegisterUserParams, User, UserAlreadyExistsError } from '@/domain/models';
export interface IRegisterUser {
  register: (user: RegisterUserParams) => Promise<User | UserAlreadyExistsError>;
}
