import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('마음 연구소 과제 버전3 API 문서')
    .setDescription('마음 연구소 과제를 위한 API 문서입니다.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
