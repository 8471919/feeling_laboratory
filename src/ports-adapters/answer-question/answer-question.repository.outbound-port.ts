import { CreateAnswerQuestionDto } from 'src/dtos/answer-question/create-answer-question.dto';
import { FindAnswerQuestionDto } from 'src/dtos/answer-question/find-answer-question.dto';

export const ANSWER_QUESTION_REPOSITORY_OUTBOUND_PORT =
  'ANSWER_QUESTION_REPOSITORY_OUTBOUND_PORT' as const;

export interface AnswerQuestionRepositoryOutboundPort {
  createAnswerQuestion(
    createAnswerQuestionDto: CreateAnswerQuestionDto
  ): Promise<FindAnswerQuestionDto>;
}
