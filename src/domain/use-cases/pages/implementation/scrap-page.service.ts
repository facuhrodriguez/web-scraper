import { ADD_PAGE_REPOSITORY, IAddPageRepository, Link, Page } from '@/domain/models';
import { IHTTPClient, HTTP_CLIENT } from '@/domain/models/gateways/httpClients';
import { IScrapPageService } from '@/domain/use-cases/';
import { verifyURL } from '@/helpers/url-verify';
import { Adapter, InternalServerErrorException } from '@tsclean/core';
import * as cheerio from 'cheerio';
export const SCRAP_PAGE_SERVICE = 'SCRAP_PAGE_SERVICE';

export class ScrapPageService implements IScrapPageService {
  constructor(
    @Adapter(HTTP_CLIENT) private readonly httpClient: IHTTPClient<unknown>,
    @Adapter(ADD_PAGE_REPOSITORY) private readonly addPageRepository: IAddPageRepository,
  ) {}

  async scrapPage(url: string, userId: string, name: string): Promise<Page | null> {
    try {
      const pageInformation: string = await this.httpClient.get(url);
      const linkPages: Link[] = [];
      const $ = cheerio.load(pageInformation);
      $('a').each((index, element) => {
        const href = $(element).attr('href');
        const linkText = $(element).text();
        // Not allow invalid urls
        if (verifyURL(href))
          linkPages.push({ link: href, name: linkText.substring(0, 300).trim() });
      });
      const newPage: Page = {
        links: linkPages,
        name,
        userId: userId,
      };
      return await this.addPageRepository.addPage(newPage);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
