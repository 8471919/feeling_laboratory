import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';
import { QuestionOptionController } from './question-option.controller';
import { QuestionOptionService } from './question-option.service';
import { QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/question-option/question-option.repository.outbound-port';
import { QuestionOptionRepository } from 'src/ports-adapters/question-option/question-option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionOptionEntity])],
  controllers: [QuestionOptionController],
  providers: [
    {
      provide: QUESTION_OPTION_REPOSITORY_OUTBOUND_PORT,
      useClass: QuestionOptionRepository,
    },
    QuestionOptionService,
  ],
})
export class QuestionOptionModule {}
