import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('e2e Question Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/question';

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [QuestionModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/question', () => {
    test.todo('설문 문항이 정상적으로 생성되는지 검증');
  });

  describe('GET /api/question', () => {
    test.todo('설문 문항이 정상적으로 읽어지는지 검증');
  });

  describe('PUT /api/question', () => {
    test.todo('설문 문항이 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/question', () => {
    test.todo('설문 문항이 정상적으로 삭제되는지 검증');
  });
});
