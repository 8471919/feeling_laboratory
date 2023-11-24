import { Body, Controller, Post } from '@nestjs/common';
import { AnswerQuestionnaireService } from './answer-questionnaire.service';
import { FindAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire.dto';
import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';

@Controller('/api/answer-questionnaire')
export class AnswerQuestionnaireController {
  constructor(
    private readonly answerQuestionnaireService: AnswerQuestionnaireService
  ) {}

  @Post()
  async createAnswerQuestionnaire(
    @Body() body: CreateAnswerQuestionnaireDto
  ): Promise<FindAnswerQuestionnaireDto> {
    const answerQuestionnaire =
      await this.answerQuestionnaireService.createAnswerQustionnaire(body);

    return answerQuestionnaire;
  }
}
