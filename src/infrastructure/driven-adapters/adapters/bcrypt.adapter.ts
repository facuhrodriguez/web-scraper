import { IHashCompare } from '@/domain/models/gateways/hash-compare';
import { IHashRepository } from '@/domain/models/gateways/hash-content';
import bcrypt from 'bcrypt';

export class BCryptAdapter implements IHashRepository, IHashCompare {
  private readonly salt: number = 14;

  async compare(text: string, verify: string): Promise<boolean> {
    return await bcrypt.compare(text, verify);
  }

  async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, this.salt);
  }
}
