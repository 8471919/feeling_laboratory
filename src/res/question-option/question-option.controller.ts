import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionOptionService } from './question-option.service';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { CreateQuestionOptionDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionsOptionDto } from 'src/dtos/question-option/find-question-options-option.dto';

@Controller('/api/question-option')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  @Post()
  async createQuestionOption(
    @Body() body: CreateQuestionOptionDto
  ): Promise<FindQuestionOptionEntityDto> {
    const questionOption =
      await this.questionOptionService.createQuestionOption(body);

    return questionOption;
  }

  @Get('/list')
  async getQuestionOptionList(
    @Query('questionId', new ParseIntPipe()) questionId: number
  ): Promise<FindQuestionOptionsOptionDto[]> {
    const questionOptionList =
      await this.questionOptionService.getQuestionOptionList(questionId);

    return questionOptionList;
  }
}
