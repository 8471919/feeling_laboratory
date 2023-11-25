import { Inject, Injectable } from '@nestjs/common';
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
}
