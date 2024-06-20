import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const config = new DocumentBuilder()
    .setTitle('TodoList')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('GrishaS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
}

start();
