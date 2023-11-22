import { PartialType, PickType } from '@nestjs/swagger';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';

export class FindQuestionOptionsOptionDto extends PartialType(
  PickType(QuestionOptionEntity, ['id', 'questionId'] as const)
) {}
