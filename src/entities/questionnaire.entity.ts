import { Column, Entity, OneToMany } from 'typeorm';
import { CommonIntPKEntity } from './common/common.entity';
// import { UserEntity } from './user.entity';
import { QuestionEntity } from './question.entity';
import { AnswerQuestionnaireEntity } from './answer-questionnaire.entity';

@Entity('Questionnaire')
export class QuestionnaireEntity extends CommonIntPKEntity {
  @Column('varchar', { length: 100, unique: false, nullable: false })
  author: string;

  @Column('varchar', { length: 100, unique: false, nullable: false })
  title: string;

  @Column('text', { unique: false, nullable: true })
  description: string | null;

  @Column('timestamp', {
    unique: false,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;

  @Column('timestamp', { unique: false, nullable: true })
  finishedAt: Date | null;

  // @Column('int', { unique: false, nullable: false })
  // userId: number;

  // @ManyToOne(() => UserEntity, (user) => user.questionnaires)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.questionnaire)
  questions: QuestionEntity[];

  @OneToMany(
    () => AnswerQuestionnaireEntity,
    (answerQuestionnaire) => answerQuestionnaire.questionnaire
  )
  answerQuestionnaires: AnswerQuestionnaireEntity[];
}
