import { Container } from '@tsclean/core';
import { adapters, services } from '@/infrastructure/driven-adapters/providers';
import { controllers } from '@/infrastructure/entry-points';
import { connect } from 'mongoose';
import { MONGODB_URI } from './configuration/environment';

@Container({
  providers: [...services, ...adapters],
  controllers: [...controllers],
})
export class AppContainer {
  static async initialize(): Promise<void> {
    if (MONGODB_URI) await connect(MONGODB_URI);
    console.log('DB Mongo connected');
  }
}
