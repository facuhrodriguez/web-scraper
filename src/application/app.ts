import express from 'express';

export class Application {
    private application: express.Application;
    constructor() {
        this.application = express();
    }

    private async initializeConfiguration(): Promise<void> {

    }

    public getApplication(): express.Application {
        return this.application;
    }
}