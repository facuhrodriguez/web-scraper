import { connect } from 'mongoose';
import Helmet from 'helmet';
import { StartProjectInit } from '@tsclean/core';

import { AppContainer } from './application/app';
import { MONGODB_URI, PORT } from '@/application/configuration/environment';

async function run(): Promise<void> {
  try {
    if (MONGODB_URI) await connect(MONGODB_URI);
    console.log('DB Mongo connected');
    const app = await StartProjectInit.create(AppContainer);
    app.use(Helmet());
    await app.listen(PORT, () => console.log('WebScraper API running on port: ' + PORT));
  } catch (error) {
    console.error('Error initializing server');
  }
}

run();
