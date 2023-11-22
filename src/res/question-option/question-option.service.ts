import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionOptionDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
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
    createQuestionOptionDto: CreateQuestionOptionDto
  ): Promise<FindQuestionOptionEntityDto> {
    const questionOption =
      await this.questionOptionRepository.createQuestionOption(
        createQuestionOptionDto
      );

    return questionOption;
  }
}
