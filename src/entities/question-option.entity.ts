import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonBigIntPKEntity } from './common/common.entity';
import { QuestionEntity } from './question.entity';
import { AnswerQuestionEntity } from './answer-question.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('QuestionOption')
export class QuestionOptionEntity extends CommonBigIntPKEntity {
  @ApiProperty({
    example: '선택지 1',
    description: '설문 답변 선택지',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column('text', { unique: false, nullable: false })
  content: string;

  @ApiProperty({
    example: 1,
    description: '설문 답변 선택지 순서',
    required: true,
  })
  @IsInt()
  @Column('int', { unique: false, nullable: false })
  order: number;

  @ApiProperty({
    example: 3,
    description: '설문 답변 선택지를 고를 시 획득하는 점수',
    required: true,
  })
  @IsInt()
  @Column('int', { unique: false, nullable: false })
  score: number;

  @ApiProperty({
    example: 1,
    description: '설문 문항 id',
    required: true,
  })
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
