import { Controller } from '@nestjs/common';
import { QuestionOptionService } from './question-option.service';

@Controller('/api/qustion-option')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}
}
