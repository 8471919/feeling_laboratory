import { Column, Entity, OneToMany } from 'typeorm';
import { CommonIntPKEntity } from './common/common.entity';
import { QuestionnaireEntity } from './questionnaire.entity';

@Entity('User')
export class UserEntity extends CommonIntPKEntity {
  @Column('varchar', { length: 100, unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 100, unique: false, nullable: false })
  password: string;

  @Column('varchar', { length: 20, unique: true, nullable: false })
  nickname: string;

  @OneToMany(() => QuestionnaireEntity, (questionnaire) => questionnaire.user)
  questionnaires: QuestionnaireEntity[];
}
