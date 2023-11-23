import { PickType } from '@nestjs/swagger';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';

export class CreateQuestionOptionEntityDto extends PickType(
  QuestionOptionEntity,
  ['content', 'order', 'score', 'questionId'] as const
) {}
