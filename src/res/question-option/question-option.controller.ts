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
import { QuestionOptionService } from './question-option.service';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { CreateQuestionOptionEntityDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityOptionDto } from 'src/dtos/question-option/find-question-options-option.dto';
import { UpdateQuestionOptionEntityDto } from 'src/dtos/question-option/update-question-option.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('선택지 API')
@Controller('/api/question-option')
export class QuestionOptionController {
  constructor(private readonly questionOptionService: QuestionOptionService) {}

  @ApiOperation({
    summary: '선택지 Create',
    description: '문항 선택지를 생성한다.',
  })
  @Post()
  async createQuestionOption(
    @Body() body: CreateQuestionOptionEntityDto
  ): Promise<FindQuestionOptionEntityDto> {
    const questionOption =
      await this.questionOptionService.createQuestionOption(body);

    return questionOption;
  }

  @ApiOperation({
    summary: '선택지 Read',
    description: '선택지 목록을 읽어온다.',
  })
  @Get('/list')
  async getQuestionOptionList(
    @Query('questionId', new ParseIntPipe()) questionId: number
  ): Promise<FindQuestionOptionEntityOptionDto[]> {
    const questionOptionList =
      await this.questionOptionService.getQuestionOptionList(questionId);

    return questionOptionList;
  }

  @ApiOperation({
    summary: '선택지 Update',
    description: '선택지를 수정한다.',
  })
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

  @ApiOperation({
    summary: '선택지 Delete',
    description: '선택지를 삭제한다.',
  })
  @Delete('/:id')
  async removeQuestionOption(
    @Param('id') questionOptionId: string
  ): Promise<boolean> {
    const isDeleted =
      await this.questionOptionService.removeQuestionOption(questionOptionId);

    return isDeleted;
  }
}
