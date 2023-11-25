import { Injectable } from '@nestjs/common';
import { AnswerQuestionRepositoryOutboundPort } from './answer-question.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerQuestionRepository
  implements AnswerQuestionRepositoryOutboundPort
{
  constructor(
    @InjectRepository(AnswerQuestionEntity)
    private readonly answerQuestionRepository: Repository<AnswerQuestionEntity>
  ) {}
}
