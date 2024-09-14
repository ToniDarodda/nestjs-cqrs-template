import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { BusinessController } from './controllers/business.controller';
import { Business } from 'src/infrastructure/entities/business.orm-entity';
import { CreateBusinessHandler } from 'src/application/commands/handlers/create-business.handler';
import { BusinessRepositoryImpl } from '../../infrastructure/repositories/business.repository';
import { BUSINESS_REPOSITORY_TOKEN } from 'src/domain/repositories/business.constant';

@Module({
  imports: [TypeOrmModule.forFeature([Business]), CqrsModule],
  controllers: [BusinessController],
  providers: [
    {
      provide: BUSINESS_REPOSITORY_TOKEN,
      useClass: BusinessRepositoryImpl,
    },
    CreateBusinessHandler,
  ],
  exports: [BUSINESS_REPOSITORY_TOKEN],
})
export class BusinessModule {}
