import {
  ADD_USER_REPOSITORY,
  HASH_COMPARE_REPOSITORY,
  HASH_REPOSITORY,
  VERIFY_USER_REPOSITORY,
  ENCRYPTER,
} from '@/domain/models';
import {
  LoginUserService,
  LOGIN_SERVICE,
  REGISTER_SERVICE,
  RegisterUserService,
} from '@/domain/use-cases';
import {
  UserMongooseRepository,
  BCryptAdapter,
  JWTAdapter,
} from '@/infrastructure/driven-adapters';

export const adapters = [
  {
    provide: ADD_USER_REPOSITORY,
    useClass: UserMongooseRepository,
  },
  {
    provide: VERIFY_USER_REPOSITORY,
    useClass: UserMongooseRepository,
  },
  {
    provide: HASH_COMPARE_REPOSITORY,
    useClass: BCryptAdapter,
  },
  {
    provide: HASH_REPOSITORY,
    useClass: BCryptAdapter,
  },
  {
    provide: ENCRYPTER,
    useClass: JWTAdapter,
  },
];

export const services = [
  {
    provide: LOGIN_SERVICE,
    useClass: LoginUserService,
  },
  {
    provide: REGISTER_SERVICE,
    useClass: RegisterUserService,
  },
];
