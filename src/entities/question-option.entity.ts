import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonBigIntPKEntity } from './common/common.entity';
import { QuestionEntity } from './question.entity';
import { AnswerQuestionEntity } from './answer-question.entity';

@Entity('QuestionOption')
export class QuestionOptionEntity extends CommonBigIntPKEntity {
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('int', { unique: false, nullable: false })
  order: number;

  @Column('int', { unique: false, nullable: false })
  score: number;

  @Column('int', { unique: false, nullable: false })
  questionId: number;

  @ManyToOne(() => QuestionEntity, (question) => question.questionOptions)
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question: QuestionEntity;

  @OneToMany(
    () => AnswerQuestionEntity,
    (answerQuestion) => answerQuestion.questionOption
  )
  answerQuestions: AnswerQuestionEntity[];
}
