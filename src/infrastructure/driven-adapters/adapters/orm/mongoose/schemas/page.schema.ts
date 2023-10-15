import { Page } from '@/domain';
import { Schema, model } from 'mongoose';

const pageSchema: Schema = new Schema({
  links: [
    {
      name: String,
      link: String,
    },
  ],
  name: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});
export const PagesSchema = model<Page>('pages', pageSchema);
