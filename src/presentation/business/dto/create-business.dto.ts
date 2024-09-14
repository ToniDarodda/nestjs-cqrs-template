import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateBusinessDto {
  @ApiProperty({ example: 'Ramify' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly name: string;

  @ApiProperty({ example: 'ramify@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @Expose()
  readonly email: string;
}
