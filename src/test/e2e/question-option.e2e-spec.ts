import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

describe('e2e QuestionOption Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/question-option';

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

  describe('POST /api/question-option', () => {
    test.todo('선택지가 정상적으로 생성되는지 검증');
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
