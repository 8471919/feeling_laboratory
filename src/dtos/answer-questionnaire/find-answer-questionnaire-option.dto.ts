import { PartialType, PickType } from '@nestjs/swagger';
import { AnswerQuestionnaireEntity } from 'src/entities/answer-questionnaire.entity';

export class FindAnswerQuestionnaireOptionDto extends PartialType(
  PickType(AnswerQuestionnaireEntity, ['id', 'questionnaireId'] as const)
) {}
