import { Page, PageResponse } from '@/domain/models';

export interface IGetUserPagesService {
  getUserPages: (userId: string) => Promise<PageResponse[]>;
}
