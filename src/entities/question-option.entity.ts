import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonBigIntPKEntity } from './common/common.entity';
import { QuestionEntity } from './question.entity';
import { AnswerQuestionEntity } from './answer-question.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@Entity('QuestionOption')
export class QuestionOptionEntity extends CommonBigIntPKEntity {
  @IsString()
  @IsNotEmpty()
  @Column('text', { unique: false, nullable: false })
  content: string;

  @IsInt()
  @Column('int', { unique: false, nullable: false })
  order: number;

  @IsInt()
  @Column('int', { unique: false, nullable: false })
  score: number;

  @IsInt()
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
