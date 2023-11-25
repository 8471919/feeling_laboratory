import { Column, Entity, OneToMany } from 'typeorm';
import { CommonIntPKEntity } from './common/common.entity';
// import { UserEntity } from './user.entity';
import { QuestionEntity } from './question.entity';
import { AnswerQuestionnaireEntity } from './answer-questionnaire.entity';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Questionnaire')
export class QuestionnaireEntity extends CommonIntPKEntity {
  @ApiProperty({
    example: 'Manager',
    description: '작성자',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { length: 100, unique: false, nullable: false })
  author: string;

  @ApiProperty({
    example: '여행 만족도 조사',
    description: '설문지 제목',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column('varchar', { length: 100, unique: false, nullable: false })
  title: string;

  @ApiProperty({
    example: '본 설문은 여행에 관한 설문입니다.',
    description: '설문지 설명',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Column('text', { unique: false, nullable: true })
  description: string | null;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '설문 시작 날짜',
    required: true,
  })
  @IsDateString()
  @Column('timestamp', {
    unique: false,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: '설문 종료 날짜',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Column('timestamp', { unique: false, nullable: true })
  finishedAt: Date | null;

  // @Column('int', { unique: false, nullable: false })
  // userId: number;

  // @ManyToOne(() => UserEntity, (user) => user.questionnaires)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.questionnaire, {
    cascade: true,
  })
  questions: QuestionEntity[];

  @OneToMany(
    () => AnswerQuestionnaireEntity,
    (answerQuestionnaire) => answerQuestionnaire.questionnaire
  )
  answerQuestionnaires: AnswerQuestionnaireEntity[];
}
