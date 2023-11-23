import { Controller } from '@nestjs/common';
import { AnswerQuestionnaireService } from './answer-questionnaire.service';

@Controller('/api/answer-questionnaire')
export class AnswerQuestionnaireController {
  constructor(
    private readonly answerQuestionnaireService: AnswerQuestionnaireService
  ) {}
}
