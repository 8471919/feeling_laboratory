import {
  Body,
  Controller,
  Delete,
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('설문지 API')
@Controller('/api/questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @ApiOperation({
    summary: '설문지 Create',
    description: '설문지를 생성한다.',
  })
  @Post()
  async createQuestionnaire(
    @Body() body: CreateQuestionnaireDto
  ): Promise<FindQuestionnaireDto> {
    const questionnaire =
      await this.questionnaireService.createQuestionnaire(body);

    return questionnaire;
  }

  @ApiOperation({
    summary: '설문지 Read',
    description: '설문지를 가져온다.',
  })
  @Get('/:id')
  async getQuestionnaireById(
    @Param('id', new ParseIntPipe()) questionnaireId: number
  ): Promise<FindQuestionnaireDto> {
    const questionnaire =
      await this.questionnaireService.getQuestionnaireById(questionnaireId);

    return questionnaire;
  }

  @ApiOperation({
    summary: '설문지 Update',
    description: '설문지를 수정한다.',
  })
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

  @ApiOperation({
    summary: '설문지 Delete',
    description: '설문지를 삭제한다.',
  })
  @Delete('/:id')
  async removeQuestionnaireById(
    @Param('id', new ParseIntPipe()) questionnaireId: number
  ): Promise<boolean> {
    const isDeleted =
      await this.questionnaireService.removeQuestionnaireById(questionnaireId);

    return isDeleted;
  }
}
