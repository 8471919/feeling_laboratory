import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import * as request from 'supertest';

describe('e2e Questionnaire Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let id: number;

  const baseUrl = '/api/questionnaire';

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/questionnaire', () => {
    test('설문지가 정상적으로 생성되는지 검증', async () => {
      const questionnaireInfo: CreateQuestionnaireDto = {
        author: 'michael',
        title: 'This is Title',
        startedAt: new Date(),
      };

      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .send(questionnaireInfo);

      id = res.body?.data?.id;

      expect(res.body.data).toHaveProperty('author');
    });
  });

  describe('GET /api/questionnaire', () => {
    test('설문지가 정상적으로 읽어지는지 검증', async () => {
      const res = await request(app.getHttpServer()).get(`${baseUrl}/${id}`);

      expect(res.body.data[0]).toHaveProperty('author');
    });
  });

  describe('PUT /api/questionnaire', () => {
    test.todo('설문지가 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/questionnaire', () => {
    test.todo('설문지가 정상적으로 삭제되는지 검증');
  });
});
