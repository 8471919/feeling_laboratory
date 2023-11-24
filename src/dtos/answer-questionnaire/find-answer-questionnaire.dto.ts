import { OmitType } from '@nestjs/swagger';
import { AnswerQuestionnaireEntity } from 'src/entities/answer-questionnaire.entity';

export class FindAnswerQuestionnaireDto extends OmitType(
  AnswerQuestionnaireEntity,
  [] as const
) {}
