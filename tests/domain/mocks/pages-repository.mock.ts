import { IAddPageRepository, IGetPageRepository, Page } from ".../../../src/domain";

export const pages: Page[] = [
    {
        links: [{
            link: "www.google.com",
            name: "Google"
        }, {

            link: "www.google.com.ar",
            name: "Google AR"
        }, {
            link: "www.test.com",
            name: "Test"
        }],
        userId: '652b6f220d39c916b07f57c8',
        name: 'Google url'
    },
    {
        links: [{
            link: "www.facebook.com",
            name: "Facebook"
        }, {

            link: "www.m.facebook.com",
            name: "Google AR"
        }],
        userId: '652b6f220d39c916b07f57c8',
        name: 'Facebook'
    }
]
export class PageRepositoryMock implements IAddPageRepository, IGetPageRepository {

    async addPage(data: Page): Promise<Page> {
        const newPage: Page = {
            ...data
        }
        return Promise.resolve(newPage);
    }
    async getPageRepositoryById(pageId: string): Promise<Page> {
        const page: Page = pages.filter((page: Page) => page._id === pageId)[0]
        return Promise.resolve(page);
    }

    async getPageRepositoryByUserId(userId: string): Promise<Page[]> {
        const pagesData: Page[] = pages.filter((page: Page) => page.userId === userId)
        return Promise.resolve(pagesData);
    }

}