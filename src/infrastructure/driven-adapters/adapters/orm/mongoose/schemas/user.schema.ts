import { Schema, model } from 'mongoose';
import { User } from '@/domain/models/user';

const schema: Schema<User> = new Schema({
  _id: String,
  userName: String,
  password: String,
  createdAt: Date,
});

export const UserSchema = model<User>('users', schema);
