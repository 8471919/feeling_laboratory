import { OmitType } from '@nestjs/swagger';
import { QuestionEntity } from 'src/entities/question.entity';

export class FindQuestionDto extends OmitType(QuestionEntity, [] as const) {}
