import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonBigIntPKEntity } from './common/common.entity';
import { AnswerQuestionnaireEntity } from './answer-questionnaire.entity';
import { QuestionEntity } from './question.entity';
import { QuestionOptionEntity } from './question-option.entity';
import { IsInt } from 'class-validator';

@Entity('AnswerQuestion')
export class AnswerQuestionEntity extends CommonBigIntPKEntity {
  @IsInt()
  @Column('int', { unique: false, nullable: false })
  answerQuestionnaireId: number;

  @IsInt()
  @Column('int', { unique: false, nullable: false })
  questionId: number;

  @IsInt()
  @Column('int', { unique: false, nullable: false })
  questionOptionId: number;

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
