import { Inject, Injectable } from '@nestjs/common';
import {
  QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT,
  QuestionnaireRepositoryOutboundPort,
} from '../../ports-adapters/questionnaire/questionnaire.repository.outbound-port';

@Injectable()
export class QuestionnaireService {
  constructor(
    @Inject(QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT)
    private readonly questionnaireRepository: QuestionnaireRepositoryOutboundPort
  ) {}
}
