import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';
import { CreateQuestionOptionEntityDto } from 'src/dtos/question-option/create-question-option.dto';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';
import * as request from 'supertest';

describe('e2e AnswerQuestionnaire Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/answer-questionnaire';

  let questionnaireId;
  let questionId;
  let questionOptionId;
  let answerQuestionnaireId;

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

    // 테스트를 위한 문항 선택지 생성
    const questionOptionInfo: CreateQuestionOptionEntityDto = {
      content: 'test option content',
      order: 1,
      questionId,
      score: 3,
    };

    const questionOption = await request(app.getHttpServer())
      .post('/api/question-option')
      .send(questionOptionInfo);

    questionOptionId = questionOption.body?.data?.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/answer-questionnaire', () => {
    test('답변 설문지가 정상적으로 생성되는지 검증', async () => {
      const answerQuestionInfo: CreateAnswerQuestionnaireDto = {
        questionnaireId,
      };

      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .send(answerQuestionInfo);

      answerQuestionnaireId = res.body?.data?.id;

      expect(res.body.data.questionnaireId).toStrictEqual(
        answerQuestionInfo.questionnaireId
      );
    });
  });

  describe('GET /api/answer-questionnaire', () => {
    test('답변 설문지 목록이 정상적으로 읽어지는지 검증', async () => {
      const res = await request(app.getHttpServer()).get(
        `${baseUrl}/list?questionnaireId=${questionnaireId}`
      );

      expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('답변 설문지가 정상적으로 읽어지는지 검증', async () => {
      const res = await request(app.getHttpServer()).get(
        `${baseUrl}/${answerQuestionnaireId}`
      );

      expect(res.body.data).toHaveProperty('questionnaireId');
    });
  });

  describe('PUT /api/answer-questionnaire', () => {
    test.todo('답변 설문지가 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/answer-questionnaire', () => {
    test('답변 설문지가 정상적으로 삭제되는지 검증', async () => {
      const res = await request(app.getHttpServer()).del(
        `${baseUrl}/${answerQuestionnaireId}`
      );

      expect(res.body.data).toBe(true);
    });

    test('존재하지 않는 답변 설문지에 대해 삭제를 요청하는 경우', async () => {
      const res = await request(app.getHttpServer()).del(
        `${baseUrl}/2100000000`
      );

      expect(res.body.data).toStrictEqual(
        ERROR_MESSAGE.FAIL_TO_DELETE_ANSWER_QUESTIONNAIRE
      );
    });
  });
});
