import { Inject, Injectable } from '@nestjs/common';
import {
  ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT,
  AnswerQuestionnaireRepositoryOutboundPort,
} from 'src/ports-adapters/answer-questionnaire/answer-questionnaire.repository.outbound-port';

@Injectable()
export class AnswerQuestionnaireService {
  constructor(
    @Inject(ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT)
    private readonly answerQuestionnaireRepository: AnswerQuestionnaireRepositoryOutboundPort
  ) {}
}
