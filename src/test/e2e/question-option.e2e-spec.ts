import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateQuestionOptionDto } from 'src/dtos/question-option/create-question-option.dto';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import * as request from 'supertest';

describe('e2e QuestionOption Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/question-option';

  let questionnaireId;
  let questionId;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    // 테스트를 위한 설문지 생성
    const startedAt = new Date();
    const finishedAt = new Date(
      startedAt.getFullYear(),
      startedAt.getMonth(),
      startedAt.getDate() + 1
    );

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

    // 테스트를 위한 설문 문항 생성
    const questionInfo: CreateQuestionDto = {
      content: 'test content',
      order: 1,
      questionnaireId,
    };

    const question = await request(app.getHttpServer())
      .post('/api/question')
      .send(questionInfo);

    questionId = question.body?.data?.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/question-option', () => {
    test('선택지가 정상적으로 생성되는지 검증', async () => {
      const questionOptionInfo: CreateQuestionOptionDto = {
        content: 'question option content',
        order: 1,
        questionId,
        score: 3,
      };

      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .send(questionOptionInfo);

      expect(res.body.data.content).toStrictEqual(questionOptionInfo.content);
    });
  });

  describe('GET /api/question-option', () => {
    test.todo('선택지가 정상적으로 읽어지는지 검증');
  });

  describe('PUT /api/question-option', () => {
    test.todo('선택지가 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/question-option', () => {
    test.todo('선택지가 정상적으로 삭제되는지 검증');
  });
});
