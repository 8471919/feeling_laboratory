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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('문항 API')
@Controller('/api/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({
    summary: '문항 Create',
    description: '설문 문항을 생성한다.',
  })
  @Post()
  async createQuestion(
    @Body() body: CreateQuestionDto
  ): Promise<FindQuestionDto> {
    const question = await this.questionService.createQuestion(body);

    return question;
  }

  @ApiOperation({
    summary: '문항 Read',
    description: '설문 문항 리스트를 읽어온다.',
  })
  @Get('/list')
  async getQuestionList(
    @Query('questionnaireId', new ParseIntPipe()) questionnaireId: number
  ): Promise<FindQuestionDto[]> {
    const questionList = await this.questionService.getQuestionList({
      questionnaireId,
    });

    return questionList;
  }

  @ApiOperation({
    summary: '문항 Update',
    description: '설문 문항을 수정한다.',
  })
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

  @ApiOperation({
    summary: '문항 Delete',
    description: '설문 문항을 삭제한다.',
  })
  @Delete('/:id')
  async removeQuestion(@Param('id', new ParseIntPipe()) questionId: number) {
    const isDeleted = await this.questionService.removeQuestion(questionId);

    return isDeleted;
  }
}
