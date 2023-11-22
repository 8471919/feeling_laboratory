import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { FindQuestionnaireOptionDto } from 'src/dtos/questionnaire/find-questionnaire-option.dto';
import { FindQuestionnaireDto } from 'src/dtos/questionnaire/find-questionnaire.dto';
import {
  UpdateQuestionnaireDto,
  UpdateQuestionnaireOptionDto,
} from 'src/dtos/questionnaire/update-questionnaire.dto';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';

export const QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT =
  'QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT' as const;

export interface QuestionnaireRepositoryOutboundPort {
  createQuestionnaire(
    createQuestionnaireDto: CreateQuestionnaireDto
  ): Promise<QuestionnaireEntity>;

  findQuestionnaireList(
    options: FindQuestionnaireOptionDto
  ): Promise<FindQuestionnaireDto[]>;

  updateQuestionnaire(
    updateQuestionnaireDto: UpdateQuestionnaireDto,
    options: UpdateQuestionnaireOptionDto
  ): Promise<boolean>;

  deleteQuestionnaire(id: number): Promise<boolean>;
}
