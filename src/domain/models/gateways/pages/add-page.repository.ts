import { Page } from '@/domain/models/page';

export const ADD_PAGE_REPOSITORY = 'ADD_PAGE_REPOSITORY';

export interface IAddPageRepository {
  addPage: (data: Page) => Promise<Page>;
}
