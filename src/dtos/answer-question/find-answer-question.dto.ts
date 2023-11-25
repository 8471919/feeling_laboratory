import { OmitType } from '@nestjs/swagger';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';

export class FindAnswerQuestionDto extends OmitType(
  AnswerQuestionEntity,
  [] as const
) {}
