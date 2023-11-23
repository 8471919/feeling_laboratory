import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerQuestionnaireEntity } from 'src/entities/answer-questionnaire.entity';
import { AnswerQuestionnaireController } from './answer-questionnaire.controller';
import { ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/answer-questionnaire/answer-questionnaire.repository.outbound-port';
import { AnswerQuestionnaireRepository } from 'src/ports-adapters/answer-questionnaire/answer-questionnaire.repository';
import { AnswerQuestionnaireService } from './answer-questionnaire.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerQuestionnaireEntity])],
  controllers: [AnswerQuestionnaireController],
  providers: [
    {
      provide: ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT,
      useClass: AnswerQuestionnaireRepository,
    },
    AnswerQuestionnaireService,
  ],
})
export class AnswerQuestionnaireModule {}
