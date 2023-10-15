import { IAddPageRepository, IGetPageRepository, Page } from ".../../../src/domain";

export const pages: Page[] = [
    {
        _id: "652ba6b145080f7ef634e90a",
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
        name: 'Facebook',
        _id: "652ba6b145080f7ef634easf8"
    },
    {
        _id: "652ba6b145080f7ef634e90b",
        links: [{
            link: "www.w3schools.com",
            name: "w3Schools"
        }, {

            link: "www.typescript.com",
            name: "Image"
        }, {
            link: "www.test.com",
            name: "Test"
        }],
        userId: '652b6f220d39c916b07f5dc8',
        name: 'W3Schools url'
    },
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

    async getPagesRepositoryByUserId(userId: string): Promise<Page[]> {
        const pagesData: Page[] = pages.filter((page: Page) => page.userId === userId)
        return Promise.resolve(pagesData);
    }

}