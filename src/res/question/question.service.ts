import { Inject, Injectable } from '@nestjs/common';
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
}
