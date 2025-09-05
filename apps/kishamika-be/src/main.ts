import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const frontendUrl = 'localhost:4200';
  const nodeEnv = configService.get<string>('NODE_ENV') || 'production';

  if (nodeEnv === 'production') {
    app.use(helmet());
  }

  app.use(cookieParser());

  // CORS configuration for production
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  app.setGlobalPrefix('api');

  await app.listen(port);

  console.log(`Server running in ${nodeEnv} mode on port ${port}`);
  console.log(`Frontend URL: ${frontendUrl}`);
}

bootstrap().catch(console.error);
