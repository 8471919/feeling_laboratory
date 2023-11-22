import { OmitType } from '@nestjs/swagger';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';

export class FindQuestionOptionEntityDto extends OmitType(
  QuestionOptionEntity,
  [] as const
) {}
