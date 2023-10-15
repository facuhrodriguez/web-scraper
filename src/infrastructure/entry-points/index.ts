import { LoginController } from '@/infrastructure/entry-points/api/users';
import { RegisterController } from './api/users/controllers/register.controller';

export const controllers = [LoginController, RegisterController];
