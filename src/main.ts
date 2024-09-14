import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

const configService = new ConfigService();
async function bootstrap() {
  const [
    FRONTEND_PATH,
    API_PORT,
    ORIGIN,
    SWAGGER_TITLE,
    SWAGGER_DESCRIPTION,
    SWAGGER_VERSION,
  ] = [
    configService.getOrThrow<string>('FRONTEND_PATH'),
    configService.getOrThrow<string>('API_PORT'),
    configService.getOrThrow<string>('ORIGIN'),
    configService.getOrThrow<string>('SWAGGER_TITLE'),
    configService.getOrThrow<string>('SWAGGER_DESCRIPTION'),
    configService.getOrThrow<string>('SWAGGER_VERSION'),
  ];

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: [ORIGIN, FRONTEND_PATH],
    methods: ['GET', 'POST', 'PUT', 'UPDATE', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.useLogger(Logger);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(API_PORT);
}

bootstrap();
