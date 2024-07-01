import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { useContainer } from 'class-validator';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('TodoList')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('GrishaSnitko')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.setGlobalPrefix('api');

  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
}

start();
