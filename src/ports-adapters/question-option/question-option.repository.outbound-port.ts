import { CreateQuestionOptionDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { FindQuestionOptionsOptionDto } from 'src/dtos/question-option/find-question-options-option.dto';

export const QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT =
  'QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT' as const;

export interface QuestionOptionRepositoryOutboundPort {
  createQuestionOption(
    createQuestionOptionDto: CreateQuestionOptionDto
  ): Promise<FindQuestionOptionEntityDto>;

  findQuestionOptionList(
    options: FindQuestionOptionsOptionDto
  ): Promise<FindQuestionOptionEntityDto[]>;
}
