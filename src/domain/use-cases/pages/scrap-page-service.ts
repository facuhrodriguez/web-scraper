import { Page } from '@/domain/models';

export interface IScrapPageService {
  scrapPage: (url: string, userId: string, name: string) => Promise<Page>;
}
