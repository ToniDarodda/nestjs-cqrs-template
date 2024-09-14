// src/application/commands/handlers/create-business.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateBusinessCommand } from '../command/business.command';
import { BusinessRepository } from 'src/domain/repositories/business.repository';

@CommandHandler(CreateBusinessCommand)
export class CreateBusinessHandler
  implements ICommandHandler<CreateBusinessCommand>
{
  constructor(
    @Inject('BusinessRepository') // Use the same token as registered in the module
    private readonly businessRepository: BusinessRepository,
  ) {}

  async execute(command: CreateBusinessCommand): Promise<void> {
    const { name, email } = command;
    const business = new CreateBusinessCommand(name, email); // Ensure this is the correct Business class
    await this.businessRepository.save(business);
  }
}
