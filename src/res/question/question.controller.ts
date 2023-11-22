import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { FindQuestionDto } from 'src/dtos/question/find-question.dto';
import { UpdateQuestionDto } from 'src/dtos/question/update-question.dto';

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

  @Get('/list')
  async getQuestionList(
    @Query('questionnaireId', new ParseIntPipe()) questionnaireId: number
  ): Promise<FindQuestionDto[]> {
    const questionList = await this.questionService.getQuestionList({
      questionnaireId,
    });

    return questionList;
  }

  @Put('/:id')
  async modifyQuestion(
    @Body() body: UpdateQuestionDto,
    @Param('id', new ParseIntPipe()) questionId: number
  ): Promise<boolean> {
    const isUpdated = await this.questionService.modifyQuestion(
      body,
      questionId
    );

    return isUpdated;
  }

  @Delete('/:id')
  async removeQuestion(@Param('id', new ParseIntPipe()) questionId: number) {
    const isDeleted = await this.questionService.removeQuestion(questionId);

    return isDeleted;
  }
}
