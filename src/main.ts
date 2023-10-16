import { NestFactory } from '@nestjs/core';
import { VersioningType, INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // swagger 생성
  setupSwagger(app, port);

  // api 버전 관리
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(port);
}

function setupSwagger(app: INestApplication, port: number): void {
  const opts = new DocumentBuilder()
    .setTitle('NestJS School News app API Docs')
    .setDescription('NestJS School News app API Description')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/api/v1`, 'local')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, opts);
  SwaggerModule.setup('api-docs', app, doc);
}

bootstrap();
