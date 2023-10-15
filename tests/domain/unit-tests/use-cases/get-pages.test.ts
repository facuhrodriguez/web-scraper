
import { GetPagesService, PageResponse } from "../../../../src/domain"
import { PageRepositoryMock } from "../../mocks/pages-repository.mock";

describe('Use case: Get user pages', () => {

    const pageMockRepository = new PageRepositoryMock();
    const userId = '652b6f220d39c916b07f57c8';
    const getPageService = new GetPagesService(pageMockRepository);
    test('should get all the user pages', async () => {
        const page: PageResponse[] = await getPageService.getUserPages(userId);
        page.forEach((pageItem: PageResponse) => {
            expect(pageItem.totalLinks).toEqual(expect.any(Number))
            expect(pageItem.userId).toEqual(userId)
        })
    }, 50000)


})