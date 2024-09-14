import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBusinessCommand } from 'src/application/commands/command/business.command';
import { CreateBusinessDto } from '../dto/create-business.dto';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBody({
    type: CreateBusinessDto,
  })
  @ApiOperation({ summary: 'Sign up into account' })
  async createUser(@Body() createUserDto: CreateBusinessDto) {
    const { name, email } = createUserDto;
    await this.commandBus.execute(new CreateBusinessCommand(name, email));
  }
}
