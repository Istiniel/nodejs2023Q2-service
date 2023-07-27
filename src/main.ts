import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const HTTP_PORT = process.env.HTTP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(HTTP_PORT);
}
bootstrap();
