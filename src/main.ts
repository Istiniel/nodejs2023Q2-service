import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger/dist';
import apiConfig from '../doc/apiConfig'

const HTTP_PORT = process.env.HTTP_PORT;



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  SwaggerModule.setup('doc', app, apiConfig())
  await app.listen(HTTP_PORT);
}
bootstrap();
