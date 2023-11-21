import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { FindQuestionnaireDto } from 'src/dtos/questionnaire/find-questionnaire.dto';

@Controller('/api/questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Post()
  async createQuestionnaire(
    @Body() body: CreateQuestionnaireDto
  ): Promise<FindQuestionnaireDto> {
    const questionnaire =
      await this.questionnaireService.createQuestionnaire(body);

    return questionnaire;
  }

  @Get('/:id')
  async getQuestionnaireListById(
    @Param('id', new ParseIntPipe()) questionnaireId: number
  ): Promise<FindQuestionnaireDto[]> {
    const questionnaire =
      await this.questionnaireService.getQuestionnaireListById(questionnaireId);

    return questionnaire;
  }
}
