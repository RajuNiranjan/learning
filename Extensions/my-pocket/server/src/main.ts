import { NestFactory } from '@nestjs/core';
import { AuthModule } from './modules/auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.enableCors({
    origin: process.env.FRONT_END_URL,
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
