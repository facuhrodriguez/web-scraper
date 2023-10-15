import { PageResponse } from '@/domain/models';

export interface IGetPageService {
  getPage: (pageId: string, userId: string) => Promise<PageResponse>;
}
