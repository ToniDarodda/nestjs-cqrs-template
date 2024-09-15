import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

import { Business } from '../entities/business.orm-entity';

config({ path: '.env.development' });

const configService = new ConfigService();

export const dataSourceOptions = {
  type: configService.getOrThrow<string>('TYPE') as unknown as never,
  host: configService.getOrThrow<string>('HOST'),
  port: parseInt(configService.getOrThrow<string>('PORT'), 10),
  username: configService.getOrThrow<string>('USERNAME'),
  password: configService.getOrThrow<string>('PASSWORD'),
  database: configService.getOrThrow<string>('DATABASE'),
  entities: [Business],
  migrations: [join(__dirname, '../database/migrations/*.js')],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize();
