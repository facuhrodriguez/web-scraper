import Helmet from 'helmet';
import { StartProjectInit } from '@tsclean/core';
import 'module-alias/register';

import { AppContainer } from './application/app';
import { PORT } from '@/application/configuration/environment';

async function run(): Promise<void> {
  try {
    await AppContainer.initialize();
    const app = await StartProjectInit.create(AppContainer);
    app.use(Helmet());
    await app.listen(PORT, () => console.log('WebScraper API running on port: ' + PORT));
  } catch (error) {
    console.error('Error initializing server');
  }
}

run();
