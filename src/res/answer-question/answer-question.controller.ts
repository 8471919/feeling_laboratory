import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AnswerQuestionService } from './answer-question.service';
import { FindAnswerQuestionDto } from 'src/dtos/answer-question/find-answer-question.dto';
import { CreateAnswerQuestionDto } from 'src/dtos/answer-question/create-answer-question.dto';
import { UpdateAnswerQuestionDto } from 'src/dtos/answer-question/update-answer-question.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('답변 API')
@Controller('/api/answer-question')
export class AnswerQuestionController {
  constructor(private readonly answerQuestionService: AnswerQuestionService) {}

  @ApiOperation({
    summary: '답변 Create',
    description: '설문 문항에 대한 답변을 생성한다.',
  })
  @Post()
  async createAnswerQuestion(
    @Body() body: CreateAnswerQuestionDto
  ): Promise<FindAnswerQuestionDto> {
    const answerQuestion =
      await this.answerQuestionService.createAnswerQuestion(body);

    return answerQuestion;
  }

  @ApiOperation({
    summary: '답변 Update',
    description: '답변을 수정한다.',
  })
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
