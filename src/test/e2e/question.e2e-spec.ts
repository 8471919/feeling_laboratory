import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import * as request from 'supertest';

describe('e2e Question Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/question';

  let questionnaireId;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    const startedAt = new Date();
    const finishedAt = new Date(
      startedAt.getFullYear(),
      startedAt.getMonth(),
      startedAt.getDate() + 1
    );

    // 테스트를 위한 설문지 생성
    const questionnaireInfo: CreateQuestionnaireDto = {
      author: 'author',
      title: 'title',
      startedAt,
      finishedAt,
    };
    const questionnaire = await request(app.getHttpServer())
      .post('/api/questionnaire')
      .send(questionnaireInfo);

    questionnaireId = questionnaire.body?.data?.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/question', () => {
    test('설문 문항이 정상적으로 생성되는지 검증', async () => {
      const questionInfo: CreateQuestionDto = {
        content: '설문 문항1',
        order: 1,
        questionnaireId,
      };

      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .send(questionInfo);

      expect(res.body.data).toHaveProperty('content');
    });
  });

  describe('GET /api/question', () => {
    test('questionnaireId로 설문 문항 리스트가 정상적으로 읽어지는지 검증', async () => {
      const res = await request(app.getHttpServer()).get(
        `${baseUrl}/list?questionnaireId=${questionnaireId}`
      );

      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/question', () => {
    test.todo('설문 문항이 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/question', () => {
    test.todo('설문 문항이 정상적으로 삭제되는지 검증');
  });
});
