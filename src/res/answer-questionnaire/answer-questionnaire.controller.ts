import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('/list')
  async getAnswerQuestionnaireList(
    @Query('questionnaireId', new ParseIntPipe()) questionnaireId: number
  ): Promise<FindAnswerQuestionnaireDto[]> {
    const answerQuestionnaireList =
      await this.answerQuestionnaireService.getAnswerQuestionList(
        questionnaireId
      );

    return answerQuestionnaireList;
  }
}
