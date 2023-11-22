import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateQuestionOptionDto } from 'src/dtos/question-option/create-question-option.dto';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';
import * as request from 'supertest';

describe('e2e QuestionOption Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/question-option';

  let questionnaireId;
  let questionId;
  let questionOptionId;

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

      questionOptionId = res.body.data.id;

      expect(res.body.data.content).toStrictEqual(questionOptionInfo.content);
    });
  });

  describe('GET /api/question-option', () => {
    test('선택지가 정상적으로 읽어지는지 검증', async () => {
      const res = await request(app.getHttpServer()).get(
        `${baseUrl}/list?questionId=${questionId}`
      );

      expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('존재하지 않는 설문 문항에 대해 읽기 요청을 했을 경우', async () => {
      const res = await request(app.getHttpServer()).get(
        `${baseUrl}/list?questionId=2100000000`
      );

      expect(res.body.data).toStrictEqual(
        ERROR_MESSAGE.FAIL_TO_FIND_QUESTION_OPTION
      );
    });
  });

  describe('PUT /api/question-option', () => {
    test.todo('선택지가 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/question-option', () => {
    test.todo('선택지가 정상적으로 삭제되는지 검증');
  });
});
