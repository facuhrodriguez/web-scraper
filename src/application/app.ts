import { Container } from '@tsclean/core';
import { adapters, services } from '../infrastructure/driven-adapters/providers';

@Container({
  providers: [...services, ...adapters],
})
export class AppContainer {}
