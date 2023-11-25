import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AnswerQuestionnaireService } from './answer-questionnaire.service';
import { FindAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire.dto';
import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('답변 API')
@Controller('/api/answer-questionnaire')
export class AnswerQuestionnaireController {
  constructor(
    private readonly answerQuestionnaireService: AnswerQuestionnaireService
  ) {}

  @ApiOperation({
    summary: '답변 설문지 Create',
    description: '설문지에 대한 답변 설문지 생성(답변 생성은 따로 API가 존재)',
  })
  @Post()
  async createAnswerQuestionnaire(
    @Body() body: CreateAnswerQuestionnaireDto
  ): Promise<FindAnswerQuestionnaireDto> {
    const answerQuestionnaire =
      await this.answerQuestionnaireService.createAnswerQustionnaire(body);

    return answerQuestionnaire;
  }

  @ApiOperation({
    summary: '답변 설문지 목록 Read',
    description: '해당하는 설문지에 대한 답변 설문지 목록을 읽어온다.',
  })
  @Get('/list')
  async getAnswerQuestionnaireList(
    @Query('questionnaireId', new ParseIntPipe()) questionnaireId: number
  ): Promise<FindAnswerQuestionnaireDto[]> {
    const answerQuestionnaireList =
      await this.answerQuestionnaireService.getAnswerQuestionnaireList(
        questionnaireId
      );

    return answerQuestionnaireList;
  }

  @ApiOperation({
    summary: '답변 Read / 완료된 설문지 확인',
    description: '설문지에 대한 답변들을 읽어온다.',
  })
  @Get('/:id')
  async getAnswerQuestionnaire(
    @Param('id', new ParseIntPipe()) answerQuestionnaireId: number
  ): Promise<FindAnswerQuestionnaireDto> {
    const answerQuestionnaire =
      await this.answerQuestionnaireService.getAnswerQuestionnaire(
        answerQuestionnaireId
      );

    return answerQuestionnaire;
  }

  @ApiOperation({
    summary: '답변 Delete',
    description: '답변 설문지를 삭제한다.',
  })
  @Delete('/:id')
  async removeAnswerQuestionnaire(
    @Param('id', new ParseIntPipe()) answerQuestionnaireId: number
  ): Promise<boolean> {
    const isDeleted =
      await this.answerQuestionnaireService.removeAnswerQuestionnaire(
        answerQuestionnaireId
      );

    return isDeleted;
  }
}
