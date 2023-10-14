import { Application } from "./application/app";

const webScrapperApp: Application = new Application();

webScrapperApp.getApplication().listen(4000, () => {
    console.log('Web scraper Server listening on port ', 3000);
})