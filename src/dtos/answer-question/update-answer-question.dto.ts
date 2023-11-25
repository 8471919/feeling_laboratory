import { PartialType, PickType } from '@nestjs/swagger';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';

export class UpdateAnswerQuestionDto extends PickType(AnswerQuestionEntity, [
  'questionOptionId',
] as const) {}

export class UpdateAnswerQuestionOptionDto extends PartialType(
  PickType(AnswerQuestionEntity, ['id'] as const)
) {}
