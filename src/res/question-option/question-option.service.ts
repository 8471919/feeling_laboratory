import { Inject, Injectable } from '@nestjs/common';
import {
  QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT,
  QuestionOptionRepositoryOutboundPort,
} from 'src/ports-adapters/question-option/question-option.repository.outbound-port';

@Injectable()
export class QuestionOptionService {
  constructor(
    @Inject(QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT)
    private readonly questionOptionRepository: QuestionOptionRepositoryOutboundPort
  ) {}
}
