import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';
import { AnswerQuestionController } from './answer-question.controller';
import { AnswerQuestionService } from './answer-question.service';
import { ANSWER_QUESTION_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/answer-question/answer-question.repository.outbound-port';
import { AnswerQuestionRepository } from 'src/ports-adapters/answer-question/answer-queston.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerQuestionEntity])],
  controllers: [AnswerQuestionController],
  providers: [
    {
      provide: ANSWER_QUESTION_REPOSITORY_OUTBOUND_PORT,
      useClass: AnswerQuestionRepository,
    },
    AnswerQuestionService,
  ],
})
export class AnswerQuestionModule {}
