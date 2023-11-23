import { CreateQuestionOptionEntityDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { FindQuestionOptionEntityOptionDto } from 'src/dtos/question-option/find-question-options-option.dto';
import {
  UpdateQuestionOptionEntityDto,
  UpdateQuestionOptionEntityOptionDto,
} from 'src/dtos/question-option/update-question-option.dto';

export const QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT =
  'QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT' as const;

export interface QuestionOptionRepositoryOutboundPort {
  createQuestionOption(
    createQuestionOptionDto: CreateQuestionOptionEntityDto
  ): Promise<FindQuestionOptionEntityDto>;

  findQuestionOptionList(
    options: FindQuestionOptionEntityOptionDto
  ): Promise<FindQuestionOptionEntityDto[]>;

  updateQuestionOption(
    updateQuestionOptionDto: UpdateQuestionOptionEntityDto,
    options: UpdateQuestionOptionEntityOptionDto
  ): Promise<boolean>;

  deleteQuestionOption(questionOptionId: string): Promise<boolean>;
}
