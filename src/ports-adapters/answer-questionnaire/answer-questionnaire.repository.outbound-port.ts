import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';
import { FindAnswerQuestionnaireOptionDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire-option.dto';
import { FindAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire.dto';

export const ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT =
  'ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT' as const;

export interface AnswerQuestionnaireRepositoryOutboundPort {
  createAnswerQuestionnaire(
    createAnswerQuestionnaireDto: CreateAnswerQuestionnaireDto
  ): Promise<FindAnswerQuestionnaireDto>;

  findAnswerQuestionnaireList(
    options: FindAnswerQuestionnaireOptionDto
  ): Promise<FindAnswerQuestionnaireDto[]>;
}
