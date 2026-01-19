import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ajusta para horario do brasil
  process.env.TZ = '03:00';
  // adiciona validação em todas as entradas de dados
  app.useGlobalPipes(new ValidationPipe());
  // limita ou libera acesso aos servidores da minhas api/backend
  app.enableCors();
  // abertura de portas para receber dados
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
