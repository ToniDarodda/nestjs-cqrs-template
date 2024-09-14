import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { BusinessModule } from './presentation/business/business.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', 'env.production'],
      cache: true,
      isGlobal: true,
    }),
    DatabaseModule,
    BusinessModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
