import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mode = process.env.NODE_ENV || 'development';

  // Load environment variables based on the mode
  dotenv.config({
    path: `.env.${mode}`,
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
