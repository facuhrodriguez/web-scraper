import {
  GET_PAGES_SERVICE,
  GET_PAGE_SERVICE,
  GetPageService,
  GetPagesService,
  INTERNAL_SERVER_ERROR,
  Page,
  UserPayload,
} from '@/domain';
import { PageInvalid } from '@/domain/models/gateways/pages/errors/page-invalid.error';
import { Auth } from '@/helpers/auth';
import { Adapter, Body, Get, HttpException, Mapping, Param } from '@tsclean/core';

@Mapping('api/v1/pages/')
export class GetPagesController {
  constructor(
    @Adapter(GET_PAGE_SERVICE) private readonly getPageService: GetPageService,
    @Adapter(GET_PAGES_SERVICE) private readonly getPagesService: GetPagesService,
  ) {}

  @Get(':pageId')
  @Auth()
  async get(
    @Param() params: { pageId: string },
    @Body() userData: UserPayload,
  ): Promise<Page | HttpException> {
    try {
      if (!params.pageId) return new HttpException(`Page not exist`, 400);
      const page: Page = await this.getPageService.getPage(params.pageId, userData.user.userId);
      return page;
    } catch (error) {
      if (error instanceof PageInvalid)
        return new HttpException(`You don't have permissions to get the page`, 401);
      return new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }

  @Get('')
  @Auth()
  async getPages(@Body() userData: UserPayload): Promise<Page[] | HttpException> {
    try {
      const page: Page[] = await this.getPagesService.getUserPages(userData.user.userId);
      return page;
    } catch (error) {
      return new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }
}
