import { IAddPageRepository, IGetPageRepository, Page } from '@/domain/models';
import { PagesSchema } from '@/infrastructure/driven-adapters/adapters/orm/mongoose/schemas/page.schema';

export class PageMongooseRepository implements IAddPageRepository, IGetPageRepository {
  async addPage(data: Page): Promise<Page> {
    return PagesSchema.create(data);
  }
  async getPageRepositoryById(pageId: string): Promise<Page> {
    return PagesSchema.findById(pageId).lean().exec();
  }
  async getPagesRepositoryByUserId(userId: string): Promise<Page[]> {
    return PagesSchema.find({ userId: userId }).lean().exec();
  }
}
