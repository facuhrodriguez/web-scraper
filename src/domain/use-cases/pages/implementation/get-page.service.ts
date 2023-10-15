import { GET_PAGE_REPOSITORY, IGetPageRepository, Page, PageResponse } from '@/domain/models';
import { IGetPageService } from '../get-page-service';
import { Adapter } from '@tsclean/core';
import { PageNotExist } from '@/domain/models/gateways/pages/errors/page-not-exist.error';
import { PageInvalid } from '@/domain/models/gateways/pages/errors/page-invalid.error';
export const GET_PAGE_SERVICE = 'GET_PAGE_SERVICE';
export class GetPageService implements IGetPageService {
  constructor(
    @Adapter(GET_PAGE_REPOSITORY) private readonly getPageRepository: IGetPageRepository,
  ) {}
  async getPage(pageId: string, userId: string): Promise<PageResponse> {
    const page: Page | null = await this.getPageRepository.getPageRepositoryById(pageId);
    if (!page) throw new PageNotExist(`Page does not exist`);

    if (page.userId.toString() !== userId)
      throw new PageInvalid(`You don't have permissions to get the page`);

    return { ...page, totalLinks: page.links.length };
  }
}
