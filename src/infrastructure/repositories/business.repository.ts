import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Business } from '../entities/business.orm-entity';
import { BusinessRepository } from 'src/domain/repositories/business.repository';

@Injectable()
export class BusinessRepositoryImpl implements BusinessRepository {
  constructor(
    @InjectRepository(Business)
    private readonly repository: Repository<Business>,
  ) {}

  async save(business: Business): Promise<void> {
    await this.repository.save(business);
  }

  create(name: string, email: string): Business {
    return this.repository.create({ name, email });
  }

  // Other methods...
}
