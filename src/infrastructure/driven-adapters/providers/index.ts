import {
  ADD_USER_REPOSITORY,
  HASH_COMPARE_REPOSITORY,
  HASH_REPOSITORY,
  VERIFY_USER_REPOSITORY,
  ENCRYPTER,
  ADD_PAGE_REPOSITORY,
  GET_PAGE_REPOSITORY,
  VALIDATIONS_REPOSITORY,
} from '@/domain/models';
import {
  LoginUserService,
  LOGIN_SERVICE,
  REGISTER_SERVICE,
  RegisterUserService,
  SCRAP_PAGE_SERVICE,
  ScrapPageService,
  GET_PAGES_SERVICE,
  GetPageService,
  GetPagesService,
  GET_PAGE_SERVICE,
} from '@/domain/use-cases';
import {
  UserMongooseRepository,
  BCryptAdapter,
  JWTAdapter,
  PageMongooseRepository,
} from '@/infrastructure/driven-adapters';
import { AxiosAdapter } from '../adapters/axios.adapter';
import { HTTP_CLIENT } from '@/domain/models/gateways/httpClients';
import { ValidatorAdapter } from '../adapters/validator.adapter';

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
  {
    provide: ADD_PAGE_REPOSITORY,
    useClass: PageMongooseRepository,
  },
  {
    provide: GET_PAGE_REPOSITORY,
    useClass: PageMongooseRepository,
  },
  {
    provide: HTTP_CLIENT,
    useClass: AxiosAdapter,
  },
  {
    provide: VALIDATIONS_REPOSITORY,
    useClass: ValidatorAdapter,
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
  {
    provide: SCRAP_PAGE_SERVICE,
    useClass: ScrapPageService,
  },
  {
    provide: GET_PAGES_SERVICE,
    useClass: GetPagesService,
  },
  {
    provide: GET_PAGE_SERVICE,
    useClass: GetPageService,
  },
];
