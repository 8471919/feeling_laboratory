import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';

export class UpdateQuestionnaireDto extends IntersectionType(
  PartialType(PickType(QuestionnaireEntity, ['description', 'finishedAt'])),
  PickType(QuestionnaireEntity, ['title', 'startedAt'])
) {}

export class UpdateQuestionnaireOptionDto extends PartialType(
  PickType(QuestionnaireEntity, ['author', 'id'])
) {}
