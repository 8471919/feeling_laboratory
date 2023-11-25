import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonBigIntPKEntity } from './common/common.entity';
import { AnswerQuestionnaireEntity } from './answer-questionnaire.entity';
import { QuestionEntity } from './question.entity';
import { QuestionOptionEntity } from './question-option.entity';
import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('AnswerQuestion')
export class AnswerQuestionEntity extends CommonBigIntPKEntity {
  @ApiProperty({
    example: 1,
    description: '답변 설문지 id',
    required: true,
  })
  @IsInt()
  @Column('int', { unique: false, nullable: false })
  answerQuestionnaireId: number;

  @ApiProperty({
    example: 1,
    description: '설문 문항 id',
    required: true,
  })
  @IsInt()
  @Column('int', { unique: false, nullable: false })
  questionId: number;

  @ApiProperty({
    example: 1,
    description: '설문 문항 선택지 id',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @Type(() => String)
  @Column('bigint', { unique: false, nullable: false })
  questionOptionId: string;

  @ManyToOne(
    () => AnswerQuestionnaireEntity,
    (answerQuestionnaire) => answerQuestionnaire.answerQuestions
  )
  answerQuestionnaire: AnswerQuestionnaireEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.answerQuestions)
  question: QuestionEntity;

  @ManyToOne(
    () => QuestionOptionEntity,
    (questionOption) => questionOption.answerQuestions
  )
  questionOption: QuestionOptionEntity;
}
