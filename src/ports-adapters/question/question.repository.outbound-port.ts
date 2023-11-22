import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { FindQuestionOptionDto } from 'src/dtos/question/find-question-option.dto';
import { FindQuestionDto } from 'src/dtos/question/find-question.dto';

export const QUESTION_REPOSITORY_OUTBOUND_PORT =
  'QUESTION_REPOSITORY_OUTBOUND_PORT' as const;

export interface QuestionRepositoryOutboundPort {
  createQuestion(
    createQuestionDto: CreateQuestionDto
  ): Promise<FindQuestionDto>;

  findQuestionList(options: FindQuestionOptionDto): Promise<FindQuestionDto[]>;
}
