import express from 'express';
import helmet from 'helmet';

export class Application {
  private application: express.Application;
  constructor() {
    this.application = express();
  }

  private async initializeConfiguration(): Promise<void> {
    this.application.use(helmet());
  }

  public getApplication(): express.Application {
    return this.application;
  }
}
