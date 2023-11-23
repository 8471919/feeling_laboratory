import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';

export class UpdateQuestionnaireDto extends IntersectionType(
  PartialType(
    PickType(QuestionnaireEntity, ['description', 'finishedAt'] as const)
  ),
  PickType(QuestionnaireEntity, ['title', 'startedAt'] as const)
) {}

export class UpdateQuestionnaireOptionDto extends PartialType(
  PickType(QuestionnaireEntity, ['author', 'id'] as const)
) {}
