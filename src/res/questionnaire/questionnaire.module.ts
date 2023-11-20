import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';
import { QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT } from '../../ports-adapters/questionnaire/questionnaire.repository.outbound-port';
import { QuestionnaireRepository } from '../../ports-adapters/questionnaire/questionnaire.repository';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity])],
  controllers: [QuestionnaireController],
  providers: [
    {
      provide: QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT,
      useClass: QuestionnaireRepository,
    },
    QuestionnaireService,
  ],
})
export class QuestionnaireModule {}
