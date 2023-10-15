import { GET_PAGE_REPOSITORY, IGetPageRepository, Page, PageResponse } from '@/domain/models';
import { Adapter } from '@tsclean/core';
import { IGetUserPagesService } from '../get-pages-service';
export const GET_PAGES_SERVICE = 'GET_PAGES_SERVICE';
export class GetPagesService implements IGetUserPagesService {
  constructor(
    @Adapter(GET_PAGE_REPOSITORY) private readonly getPageRepository: IGetPageRepository,
  ) {}
  async getUserPages(userId: string): Promise<PageResponse[]> {
    const pages: Page[] = await this.getPageRepository.getPagesRepositoryByUserId(userId);
    if (!pages.length) return [];
    return pages.map((page: Page) => {
      const { links, name, userId, _id } = page;
      return {
        links,
        name,
        userId,
        _id,
        totalLinks: page.links.length,
      };
    });
  }
}
