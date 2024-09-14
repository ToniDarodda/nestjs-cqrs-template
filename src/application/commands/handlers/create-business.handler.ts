import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateBusinessCommand } from '../command/business.command';
import { BusinessRepository } from 'src/domain/repositories/business.repository';

@CommandHandler(CreateBusinessCommand)
export class CreateBusinessHandler
  implements ICommandHandler<CreateBusinessCommand>
{
  constructor(
    @Inject('BusinessRepository')
    private readonly repository: BusinessRepository,
  ) {}

  async execute(command: CreateBusinessCommand): Promise<void> {
    const { name, email } = command;
    const business = this.repository.create(name, email);

    await this.repository.save(business);
  }
}
