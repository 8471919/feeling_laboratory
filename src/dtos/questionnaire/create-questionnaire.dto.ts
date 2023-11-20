import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';

export class CreateQuestionnaireDto extends IntersectionType(
  PartialType(
    PickType(QuestionnaireEntity, ['description', 'finishedAt'] as const)
  ),
  PickType(QuestionnaireEntity, ['author', 'title', 'startedAt'] as const)
) {}
