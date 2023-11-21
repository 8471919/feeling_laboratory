import { PartialType, PickType } from '@nestjs/swagger';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';

export class FindQuestionnaireOptionDto extends PartialType(
  PickType(QuestionnaireEntity, ['id', 'author'])
) {}
