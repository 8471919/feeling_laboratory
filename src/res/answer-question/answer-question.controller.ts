import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { FindAnswerQuestionDto } from 'src/dtos/answer-question/find-answer-question.dto';
import { CreateAnswerQuestionDto } from 'src/dtos/answer-question/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from 'src/dtos/answer-question/update-answer-question.dto';

@Controller('/api/answer-question')
export class AnswerQuestionController {
  constructor(private readonly answerQuestionService: AnswerQuestionService) {}

  @Post()
  async createAnswerQuestion(
    @Body() body: CreateAnswerQuestionDto
  ): Promise<FindAnswerQuestionDto> {
    const answerQuestion =
      await this.answerQuestionService.createAnswerQuestion(body);

    return answerQuestion;
  }

  @Put('/:id')
  async modifyAnswerQuestion(
    @Body() body: UpdateAnswerQuestionDto,
    @Param('id') answerQuestionId: string
  ): Promise<boolean> {
    const isUpdated = await this.answerQuestionService.modifyAnswerQuestion(
      body,
      answerQuestionId
    );

    return isUpdated;
  }
}
