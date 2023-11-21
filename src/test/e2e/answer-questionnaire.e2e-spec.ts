import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('e2e AnswerQuestionnaire Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/answer-questionnaire';

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

  describe('POST /api/answer-questionnaire', () => {
    test.todo('답변 설문지가 정상적으로 생성되는지 검증');
  });

  describe('GET /api/answer-questionnaire', () => {
    test.todo('답변 설문지가 정상적으로 읽어지는지 검증');
  });

  describe('PUT /api/answer-questionnaire', () => {
    test.todo('답변 설문지가 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/answer-questionnaire', () => {
    test.todo('답변 설문지가 정상적으로 삭제되는지 검증');
  });
});
