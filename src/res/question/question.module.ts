import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { QuestionController } from './question.controller';
import { QUESTION_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/question/question.repository.outbound-port';
import { QuestionRepository } from 'src/ports-adapters/question/question.repository';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [
    {
      provide: QUESTION_REPOSITORY_OUTBOUND_PORT,
      useClass: QuestionRepository,
    },
    QuestionService,
  ],
})
export class QuestionModule {}
