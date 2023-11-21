import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireModule } from 'src/res/questionnaire/questionnaire.module';

describe('e2e Questionnaire Test', () => {
  let app: INestApplication;
  let testingModule: TestingModule;

  const baseUrl = '/api/questionnaire';

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [QuestionnaireModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/questionnaire', () => {
    test.todo('설문지가 정상적으로 생성되는지 검증');
  });

  describe('GET /api/questionnaire', () => {
    test.todo('설문지가 정상적으로 읽어지는지 검증');
  });

  describe('PUT /api/questionnaire', () => {
    test.todo('설문지가 정상적으로 수정되는지 검증');
  });

  describe('DELETE /api/questionnaire', () => {
    test.todo('설문지가 정상적으로 삭제되는지 검증');
  });
});
