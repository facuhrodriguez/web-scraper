import { Page, ScrapPageService } from "../../../../src/domain"
import { AxiosAdapter } from "../../../../src/infrastructure/driven-adapters/adapters/axios.adapter"
import { PageRepositoryMock } from "../../mocks/pages-repository.mock";

describe('Use case: Scrap page', () => {
    const axiosClient = new AxiosAdapter();
    const pageMockRepository = new PageRepositoryMock();
    const webPage = 'https://www.w3schools.com';
    const userId = '652b6f220d39c916b07f57c8';
    const pageName = 'W3Schools';
    const scrapPageService = new ScrapPageService(axiosClient, pageMockRepository);
    test('should scrap and create a new page for the userId', async () => {
        const newPage: Page = await scrapPageService.scrapPage(webPage, userId, pageName);
        expect(newPage).toHaveProperty('links');
        expect(newPage.userId).toEqual(userId)
    }, 50000)
})