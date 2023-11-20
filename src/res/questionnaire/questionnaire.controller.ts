import { Controller } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';

@Controller('/api/questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}
}
