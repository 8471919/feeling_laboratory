import { PartialType, PickType } from '@nestjs/swagger';
import { QuestionEntity } from 'src/entities/question.entity';

export class FindQuestionOptionDto extends PartialType(
  PickType(QuestionEntity, ['id', 'questionnaireId'] as const)
) {}
