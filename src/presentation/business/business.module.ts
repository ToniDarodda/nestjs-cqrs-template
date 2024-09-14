import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { BusinessController } from './controllers/business.controller';
import { Business } from 'src/infrastructure/entities/business.orm-entity';
import { CreateBusinessHandler } from 'src/application/commands/handlers/create-business.handler';
import { BusinessRepositoryImpl } from '../../infrastructure/repositories/business.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Business]), CqrsModule],
  controllers: [BusinessController],
  providers: [CreateBusinessHandler, BusinessRepositoryImpl],
})
export class BusinessModule {}
