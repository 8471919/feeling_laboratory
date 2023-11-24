import { PickType } from '@nestjs/swagger';
import { AnswerQuestionnaireEntity } from 'src/entities/answer-questionnaire.entity';

export class CreateAnswerQuestionnaireDto extends PickType(
  AnswerQuestionnaireEntity,
  ['questionnaireId'] as const
) {}
