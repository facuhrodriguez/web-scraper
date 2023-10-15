import { RegisterController, LoginController } from '@/infrastructure/entry-points/api/users';
import { GetPagesController, WebScraperController } from '@/infrastructure/entry-points/api/pages';
export const controllers = [
  LoginController,
  RegisterController,
  WebScraperController,
  GetPagesController,
];
