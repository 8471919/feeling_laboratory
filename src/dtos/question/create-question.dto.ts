import { PickType } from '@nestjs/swagger';
import { QuestionEntity } from 'src/entities/question.entity';

export class CreateQuestionDto extends PickType(QuestionEntity, [
  'content',
  'order',
  'questionnaireId',
] as const) {}
