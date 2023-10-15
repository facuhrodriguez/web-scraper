import { Page } from '@/domain/models/page';

export const GET_PAGE_REPOSITORY = 'GET_PAGE_REPOSITORY';

export interface IGetPageRepository {
  getPageRepositoryById: (pageId: string) => Promise<Page>;
  getPagesRepositoryByUserId: (userId: string) => Promise<Page[]>;
}
