import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonIntPKEntity } from './common/common.entity';
import { QuestionnaireEntity } from './questionnaire.entity';
import { AnswerQuestionEntity } from './answer-question.entity';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('AnswerQuestionnaire')
export class AnswerQuestionnaireEntity extends CommonIntPKEntity {
  @ApiProperty({
    example: 1,
    description: '설문지 id',
    required: true,
  })
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
