import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST', 'HEAD'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Documentación con Swagger')
    .setDescription('Proyecto de Patrones de Software')
    .setVersion('0.5')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(parseInt(process.env.PORT));
}
bootstrap();
