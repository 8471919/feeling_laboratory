import { OmitType } from '@nestjs/swagger';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';

export class FindQuestionnaireDto extends OmitType(
  QuestionnaireEntity,
  [] as const
) {}
