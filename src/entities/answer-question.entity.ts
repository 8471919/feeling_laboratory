import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonBigIntPKEntity } from './common/common.entity';
import { AnswerQuestionnaireEntity } from './answer-questionnaire.entity';
import { QuestionEntity } from './question.entity';
import { QuestionOptionEntity } from './question-option.entity';

@Entity('AnswerQuestion')
export class AnswerQuestionEntity extends CommonBigIntPKEntity {
  @Column('int', { unique: false, nullable: false })
  answerQuestionnaireId: number;

  @Column('int', { unique: false, nullable: false })
  questionId: number;

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
