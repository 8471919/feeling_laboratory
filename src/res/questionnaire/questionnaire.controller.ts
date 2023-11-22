import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { FindQuestionnaireDto } from 'src/dtos/questionnaire/find-questionnaire.dto';
import { UpdateQuestionnaireDto } from 'src/dtos/questionnaire/update-questionnaire.dto';

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
  async getQuestionnaireById(
    @Param('id', new ParseIntPipe()) questionnaireId: number
  ): Promise<FindQuestionnaireDto> {
    const questionnaire =
      await this.questionnaireService.getQuestionnaireById(questionnaireId);

    return questionnaire;
  }

  @Put('/:id')
  async modifyQuestionnaireById(
    @Body() body: UpdateQuestionnaireDto,
    @Param('id', new ParseIntPipe()) questionnaireId: number
  ): Promise<boolean> {
    const isUpdated = await this.questionnaireService.modifyQuestionnaireById(
      body,
      questionnaireId
    );

    return isUpdated;
  }
}
