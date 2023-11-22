import { Controller } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('/api/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
}
