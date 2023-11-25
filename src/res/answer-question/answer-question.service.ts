import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerQuestionDto } from 'src/dtos/answer-question/create-answer-question.dto';
import { FindAnswerQuestionDto } from 'src/dtos/answer-question/find-answer-question.dto';
import {
  ANSWER_QUESTION_REPOSITORY_OUTBOUND_PORT,
  AnswerQuestionRepositoryOutboundPort,
} from 'src/ports-adapters/answer-question/answer-question.repository.outbound-port';

@Injectable()
export class AnswerQuestionService {
  constructor(
    @Inject(ANSWER_QUESTION_REPOSITORY_OUTBOUND_PORT)
    private readonly answerQuestionRepository: AnswerQuestionRepositoryOutboundPort
  ) {}

  async createAnswerQuestion(
    createAnswerQuestionDto: CreateAnswerQuestionDto
  ): Promise<FindAnswerQuestionDto> {
    const answerQuestion =
      await this.answerQuestionRepository.createAnswerQuestion(
        createAnswerQuestionDto
      );

    return answerQuestion;
  }
}
