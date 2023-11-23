import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionOptionEntityDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { UpdateQuestionOptionEntityDto } from 'src/dtos/question-option/update-question-option.dto';
import {
  QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT,
  QuestionOptionRepositoryOutboundPort,
} from 'src/ports-adapters/question-option/question-option.repository.outbound-port';

@Injectable()
export class QuestionOptionService {
  constructor(
    @Inject(QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT)
    private readonly questionOptionRepository: QuestionOptionRepositoryOutboundPort
  ) {}

  async createQuestionOption(
    createQuestionOptionDto: CreateQuestionOptionEntityDto
  ): Promise<FindQuestionOptionEntityDto> {
    const questionOption =
      await this.questionOptionRepository.createQuestionOption(
        createQuestionOptionDto
      );

    return questionOption;
  }

  async getQuestionOptionList(
    questionId: number
  ): Promise<FindQuestionOptionEntityDto[]> {
    const questionOptionList =
      await this.questionOptionRepository.findQuestionOptionList({
        questionId,
      });

    return questionOptionList;
  }

  async modifyQuestionOption(
    updateQuestionOptionDto: UpdateQuestionOptionEntityDto,
    questionOptionId: string
  ): Promise<boolean> {
    const isUpdated = await this.questionOptionRepository.updateQuestionOption(
      updateQuestionOptionDto,
      { id: questionOptionId }
    );

    return isUpdated;
  }

  async removeQuestionOption(questionOptionId: string): Promise<boolean> {
    const isDeleted =
      await this.questionOptionRepository.deleteQuestionOption(
        questionOptionId
      );

    return isDeleted;
  }
}
