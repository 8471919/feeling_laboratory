import { PartialType, PickType } from '@nestjs/swagger';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';

export class FindAnswerQuestionOptionDto extends PartialType(
  PickType(AnswerQuestionEntity, [
    'id',
    'questionId',
    'answerQuestionnaireId',
  ] as const)
) {}
