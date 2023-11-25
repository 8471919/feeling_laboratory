import { Controller } from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';

@Controller('/api/answer-question')
export class AnswerQuestionController {
  constructor(private readonly answerQuestionService: AnswerQuestionService) {}
}
