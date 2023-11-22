import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from 'src/dtos/questionnaire/update-questionnaire.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';
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

      expect(res.body.data).toHaveProperty('author');
    });

    test('존재하지 않는 설문지를 가져오는 경우 검증', async () => {
      const res = await request(app.getHttpServer()).get(
        `${baseUrl}/2100000000`
      );

      expect(res.body.data).toStrictEqual(
        ERROR_MESSAGE.NOT_FOUND_QUESTIONNAIRE
      );
    });
  });

  describe('PUT /api/questionnaire', () => {
    test('설문지가 정상적으로 수정되는지 검증', async () => {
      const questionnaire: UpdateQuestionnaireDto = {
        title: 'updated Title',
        startedAt: new Date(),
      };
      const res = await request(app.getHttpServer())
        .put(`${baseUrl}/${id}`)
        .send(questionnaire);

      expect(res.body.data).toBe(true);
    });
  });

  describe('DELETE /api/questionnaire', () => {
    test.todo('설문지가 정상적으로 삭제되는지 검증');
  });
});
