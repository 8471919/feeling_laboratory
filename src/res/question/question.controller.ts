import { Body, Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { FindQuestionDto } from 'src/dtos/question/find-question.dto';

@Controller('/api/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(
    @Body() body: CreateQuestionDto
  ): Promise<FindQuestionDto> {
    const question = await this.questionService.createQuestion(body);

    return question;
  }
}