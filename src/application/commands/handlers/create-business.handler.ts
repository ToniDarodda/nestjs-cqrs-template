import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateBusinessCommand } from '../command/business.command';
import { BusinessRepository } from 'src/domain/repositories/business.repository';
import { BUSINESS_REPOSITORY_TOKEN } from 'src/domain/repositories/business.constant';

@CommandHandler(CreateBusinessCommand)
export class CreateBusinessHandler
  implements ICommandHandler<CreateBusinessCommand>
{
  constructor(
    @Inject(BUSINESS_REPOSITORY_TOKEN)
    private readonly repository: BusinessRepository,
  ) {}

  async execute(command: CreateBusinessCommand): Promise<void> {
    const { name, email } = command;

    const exist = await this.repository.exist(name, email);

    if (exist) {
      throw new ConflictException(`Business name or email already used`);
    }

    const business = this.repository.create(name, email);

    await this.repository.save(business);
  }
}
