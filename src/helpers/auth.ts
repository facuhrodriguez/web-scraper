import { AccessResource, applyDecorators } from '@tsclean/core';
import { JWTAdapter } from '@/infrastructure/driven-adapters';

export function Auth() {
  return applyDecorators(AccessResource(new JWTAdapter()));
}
