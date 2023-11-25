import { Injectable } from '@nestjs/common';
import { AnswerQuestionRepositoryOutboundPort } from './answer-question.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';
import { Repository } from 'typeorm';
import { CreateAnswerQuestionDto } from 'src/dtos/answer-question/create-answer-question.dto';
import { FindAnswerQuestionDto } from 'src/dtos/answer-question/find-answer-question.dto';

@Injectable()
export class AnswerQuestionRepository
  implements AnswerQuestionRepositoryOutboundPort
{
  constructor(
    @InjectRepository(AnswerQuestionEntity)
    private readonly answerQuestionRepository: Repository<AnswerQuestionEntity>
  ) {}

  async createAnswerQuestion(
    createAnswerQuestionDto: CreateAnswerQuestionDto
  ): Promise<FindAnswerQuestionDto> {
    const answerQuestion = await this.answerQuestionRepository.save(
      createAnswerQuestionDto
    );

    return answerQuestion;
  }
}
