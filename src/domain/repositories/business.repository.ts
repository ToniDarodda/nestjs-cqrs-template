import { Business } from '../entities/business.entity';

export interface BusinessRepository {
  save(user: Business): Promise<void>;

  create(name: string, email: string): Business;

  exist(name: string, email: string): Promise<boolean>;
}
