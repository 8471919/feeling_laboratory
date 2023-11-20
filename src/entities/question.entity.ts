import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonIntPKEntity } from './common/common.entity';
import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionOptionEntity } from './question-option.entity';
import { AnswerQuestionEntity } from './answer-question.entity';

@Entity('Question')
export class QuestionEntity extends CommonIntPKEntity {
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('int', { unique: false, nullable: false })
  order: number;

  @Column('int', { unique: false, nullable: false })
  questionnaireId: number;

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.questions
  )
  @JoinColumn({ name: 'questionnaireId', referencedColumnName: 'id' })
  questionnaire: QuestionnaireEntity;

  @OneToMany(
    () => QuestionOptionEntity,
    (questionOption) => questionOption.question
  )
  questionOptions: QuestionOptionEntity[];

  @OneToMany(
    () => AnswerQuestionEntity,
    (answerQuestion) => answerQuestion.question
  )
  answerQuestions: AnswerQuestionEntity[];
}
