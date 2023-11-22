import { PartialType, PickType } from '@nestjs/swagger';
import { QuestionEntity } from 'src/entities/question.entity';

export class UpdateQuestionDto extends PickType(QuestionEntity, [
  'content',
  'order',
] as const) {}

export class UpdateQuestionOptionDto extends PartialType(
  PickType(QuestionEntity, ['id'] as const)
) {}
