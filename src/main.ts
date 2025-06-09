import crypto from 'crypto';

(globalThis as unknown as { crypto: typeof crypto }).crypto = crypto;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000', // for local frontend dev
      'https://village-mart-customer-frontend.vercel.app', // for production frontend
      // add more URLs if needed
    ],
    credentials: true,
  });

  await app.listen(3005);
}
bootstrap();
