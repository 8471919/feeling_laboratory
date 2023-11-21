import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('e2e AnswerQuestion Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/answer-question';

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

  describe('POST /api/answer-question', () => {
    test.todo('설문 답변 문항이 정상적으로 생성되는지 검증');
  });

  describe('GET /api/answer-question', () => {
    test.todo('설문 답변 문항이 정상적으로 읽어지는지 검증');
  });

  describe('PUT /api/answer-question', () => {
    test.todo('설문 답변 문항이 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/answer-question', () => {
    test.todo('설문 답변 문항이 정상적으로 삭제되는지 검증');
  });
});
