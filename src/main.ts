import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // api 버전 관리
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });


  await app.listen(3000);
}
bootstrap();
