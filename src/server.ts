import { Application } from './application/app';
import { PORT, MONGODB_URI } from './application/configuration/environment';
const webScrapperApp: Application = new Application();
import { connect } from 'mongoose';

async function run() {
  try {
    if (MONGODB_URI) {
      await connect(MONGODB_URI);
      console.log('Database initialized');
    }
    webScrapperApp
      .getApplication()
      .listen(PORT, () => console.log('Web scraper server listening on port', PORT));
  } catch (error) {
    console.error('Error initializing server', error);
  }
}

run();
