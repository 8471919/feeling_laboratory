import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateAnswerQuestionDto } from 'src/dtos/answer-question/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from 'src/dtos/answer-question/update-answer-question.dto';
import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';
import { CreateQuestionOptionEntityDto } from 'src/dtos/question-option/create-question-option.dto';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';
import * as request from 'supertest';

describe('e2e AnswerQuestion Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/answer-question';

  let questionnaireId;
  let questionId;
  let questionOptionId;
  let answerQuestionnaireId;
  let answerQuestionId;

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

    // 테스트를 위한 답변 설문지 생성
    const answerQuestionnaireInfo: CreateAnswerQuestionnaireDto = {
      questionnaireId,
    };

    const answerQuestionnaire = await request(app.getHttpServer())
      .post('/api/answer-questionnaire')
      .send(answerQuestionnaireInfo);

    answerQuestionnaireId = answerQuestionnaire.body?.data?.id;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/answer-question', () => {
    test('설문 답변 문항이 정상적으로 생성되는지 검증', async () => {
      const answerQuestionInfo: CreateAnswerQuestionDto = {
        answerQuestionnaireId,
        questionId,
        questionOptionId,
      };

      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .send(answerQuestionInfo);

      answerQuestionId = res.body?.data?.id;

      expect(res.body.data.answerQuestionnaireId).toStrictEqual(
        answerQuestionInfo.answerQuestionnaireId
      );
    });
  });

  describe('GET /api/answer-question', () => {
    test.todo('설문 답변 문항이 정상적으로 읽어지는지 검증');
  });

  describe('PUT /api/answer-question', () => {
    test('설문 답변 문항이 정상적으로 수정되는지 검증', async () => {
      const answerQuestionInfo: UpdateAnswerQuestionDto = {
        questionOptionId,
      };

      const res = await request(app.getHttpServer())
        .put(`${baseUrl}/${answerQuestionId}`)
        .send(answerQuestionInfo);

      expect(res.body.data).toBe(true);
    });

    test('존재하지 않는 설문 답변 문항에 대한 검증', async () => {
      const answerQuestionInfo: UpdateAnswerQuestionDto = {
        questionOptionId,
      };

      const res = await request(app.getHttpServer())
        .put(`${baseUrl}/2100000000`)
        .send(answerQuestionInfo);

      expect(res.body.data).toStrictEqual(
        ERROR_MESSAGE.FAIL_TO_UPDATE_ANSWER_QUESTION
      );
    });
  });

  describe('DELETE /api/answer-question', () => {
    test.todo('설문 답변 문항이 정상적으로 삭제되는지 검증');
  });
});
