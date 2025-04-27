import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get('NODE_ENV');

  // adding global prefix
  app.setGlobalPrefix('api');

  // swagger setup only for dev environment
  if (!nodeEnv || nodeEnv === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Easy auth API')
      .setDescription('API that shows user auth')
      .setVersion('1.0')
      .addTag('easy-auth')
      .addBearerAuth()
      .build();
    const documentFactory = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, documentFactory);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(helmet());
  
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
