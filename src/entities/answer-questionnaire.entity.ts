import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonIntPKEntity } from './common/common.entity';
import { QuestionnaireEntity } from './questionnaire.entity';
import { AnswerQuestionEntity } from './answer-question.entity';
import { IsInt } from 'class-validator';

@Entity('AnswerQuestionnaire')
export class AnswerQuestionnaireEntity extends CommonIntPKEntity {
  @IsInt()
  @Column('int', { unique: false, nullable: false })
  questionnaireId: number;

  @ManyToOne(
    () => QuestionnaireEntity,
    (questionnaire) => questionnaire.answerQuestionnaires
  )
  @JoinColumn({ name: 'questionnaireId', referencedColumnName: 'id' })
  questionnaire: QuestionnaireEntity;

  @OneToMany(
    () => AnswerQuestionEntity,
    (answerQuestion) => answerQuestion.answerQuestionnaire,
    {
      cascade: true,
    }
  )
  answerQuestions: AnswerQuestionEntity[];
}
