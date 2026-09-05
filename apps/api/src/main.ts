import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')),);

  await app.listen(process.env.PORT || 3002);
}

bootstrap();