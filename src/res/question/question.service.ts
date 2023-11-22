import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { FindQuestionOptionDto } from 'src/dtos/question/find-question-option.dto';
import { FindQuestionDto } from 'src/dtos/question/find-question.dto';
import {
  QUESTION_REPOSITORY_OUTBOUND_PORT,
  QuestionRepositoryOutboundPort,
} from 'src/ports-adapters/question/question.repository.outbound-port';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(QUESTION_REPOSITORY_OUTBOUND_PORT)
    private readonly questionRepository: QuestionRepositoryOutboundPort
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto
  ): Promise<FindQuestionDto> {
    const question =
      await this.questionRepository.createQuestion(createQuestionDto);

    return question;
  }

  async getQuestionList(
    options: FindQuestionOptionDto
  ): Promise<FindQuestionDto[]> {
    const questionList =
      await this.questionRepository.findQuestionList(options);

    return questionList;
  }
}
