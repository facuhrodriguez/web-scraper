import {
  INTERNAL_SERVER_ERROR,
  IValidationsRepository,
  Page,
  SCRAP_PAGE_SERVICE,
  ScrapPageService,
  VALIDATIONS_REPOSITORY,
  WebScraperRequest,
} from '@/domain';
import { Auth } from '@/helpers/auth';
import { Adapter, Body, HttpException, Mapping, Post } from '@tsclean/core';

@Mapping('api/v1/pages/web-scraper')
export class WebScraperController {
  constructor(
    @Adapter(SCRAP_PAGE_SERVICE) private readonly scrapService: ScrapPageService,
    @Adapter(VALIDATIONS_REPOSITORY) private readonly validator: IValidationsRepository,
  ) {}

  @Post()
  @Auth()
  async webScraper(@Body() data: WebScraperRequest): Promise<Page | HttpException> {
    try {
      const toValidate: string[] = ['name', 'link'];
      const validation = this.validator.validation(data, toValidate);
      if (!validation?.isValid && validation?.errors)
        return new HttpException(validation.errors, 400);
      const newPage: Page = await this.scrapService.scrapPage(
        data.link,
        data.user.userId,
        data.name,
      );
      return newPage;
    } catch (error) {
      return new HttpException(INTERNAL_SERVER_ERROR, 500);
    }
  }
}
