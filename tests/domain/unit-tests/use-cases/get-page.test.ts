import { PageInvalid } from "@/domain/models/gateways/pages/errors/page-invalid.error";
import { GetPageService, PageResponse } from "../../../../src/domain"
import { PageRepositoryMock } from "../../mocks/pages-repository.mock";

describe('Use case: Get user pages', () => {

    const pageMockRepository = new PageRepositoryMock();
    const userId = '652b6f220d39c916b07f57c8';
    const pageId = '652ba6b145080f7ef634e90a';
    const invalidPageId = '652ba6b145080f7ef634e90b'
    const getPageService = new GetPageService(pageMockRepository);
    test('should get the user page', async () => {
        const page: PageResponse = await getPageService.getPage(pageId, userId);
        expect(page).toHaveProperty('links');
        expect(page.userId).toEqual(userId)
        expect(page.totalLinks).toBe(3);
    }, 50000)

    test('should throw an error if the page does not belong to the user', async () => {
        await expect(getPageService.getPage(invalidPageId, userId)).rejects.toThrowError(PageInvalid);
    }, 50000)
})