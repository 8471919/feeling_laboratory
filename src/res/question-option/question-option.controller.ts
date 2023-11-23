import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QuestionOptionService } from './question-option.service';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { CreateQuestionOptionEntityDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityOptionDto } from 'src/dtos/question-option/find-question-options-option.dto';
import { UpdateQuestionOptionEntityDto } from 'src/dtos/question-option/update-question-option.dto';

@Controller('/api/question-option')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  @Post()
  async createQuestionOption(
    @Body() body: CreateQuestionOptionEntityDto
  ): Promise<FindQuestionOptionEntityDto> {
    const questionOption =
      await this.questionOptionService.createQuestionOption(body);

    return questionOption;
  }

  @Get('/list')
  async getQuestionOptionList(
    @Query('questionId', new ParseIntPipe()) questionId: number
  ): Promise<FindQuestionOptionEntityOptionDto[]> {
    const questionOptionList =
      await this.questionOptionService.getQuestionOptionList(questionId);

    return questionOptionList;
  }

  @Put('/:id')
  async modifyQuestionOption(
    @Body() body: UpdateQuestionOptionEntityDto,
    @Param('id') questionOptionId: string
  ): Promise<boolean> {
    const isUpdated = await this.questionOptionService.modifyQuestionOption(
      body,
      questionOptionId
    );

    return isUpdated;
  }
}
