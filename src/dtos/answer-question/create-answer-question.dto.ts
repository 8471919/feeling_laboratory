import { PickType } from '@nestjs/swagger';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';

export class CreateAnswerQuestionDto extends PickType(AnswerQuestionEntity, [
  'answerQuestionnaireId',
  'questionId',
  'questionOptionId',
] as const) {}
