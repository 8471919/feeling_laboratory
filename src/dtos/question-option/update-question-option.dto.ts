import { PickType } from '@nestjs/swagger';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';

export class UpdateQuestionOptionEntityDto extends PickType(
  QuestionOptionEntity,
  ['content', 'order', 'score'] as const
) {}

export class UpdateQuestionOptionEntityOptionDto extends PickType(
  QuestionOptionEntity,
  ['id'] as const
) {}
