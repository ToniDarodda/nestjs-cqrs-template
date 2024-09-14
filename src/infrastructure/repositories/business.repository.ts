// src/infrastructure/repositories/business.repository.ts
import { Injectable } from '@nestjs/common';
import { BusinessRepository } from 'src/domain/repositories/business.repository';
import { Repository } from 'typeorm';
import { Business } from '../entities/business.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BusinessRepositoryImpl implements BusinessRepository {
  constructor(
    @InjectRepository(Business)
    private readonly repository: Repository<Business>,
  ) {}

  async save(business: Business): Promise<void> {
    await this.repository.save(business);
  }

  create(name: string, email: string): void {
    this.save(this.repository.create({ name, email }));
  }

  // Other methods...
}
