import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonIntPKEntity } from './common/common.entity';
import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionOptionEntity } from './question-option.entity';
import { AnswerQuestionEntity } from './answer-question.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Question')
export class QuestionEntity extends CommonIntPKEntity {
  @ApiProperty({
    example: '다음 중 어느 곳을 여행가고 싶나요? (1개만 선택)',
    description: '질문 내용',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column('text', { unique: false, nullable: false })
  content: string;

  @ApiProperty({
    example: 1,
    description: '설문 문항 순서',
    required: true,
  })
  @IsInt()
  @Column('int', { unique: false, nullable: false })
  order: number;

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
    (questionnaire) => questionnaire.questions
  )
  @JoinColumn({ name: 'questionnaireId', referencedColumnName: 'id' })
  questionnaire: QuestionnaireEntity;

  @OneToMany(
    () => QuestionOptionEntity,
    (questionOption) => questionOption.question,
    {
      cascade: true,
    }
  )
  questionOptions: QuestionOptionEntity[];

  @OneToMany(
    () => AnswerQuestionEntity,
    (answerQuestion) => answerQuestion.question
  )
  answerQuestions: AnswerQuestionEntity[];
}
