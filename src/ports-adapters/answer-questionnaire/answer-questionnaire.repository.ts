import { Injectable } from '@nestjs/common';
import { AnswerQuestionnaireRepositoryOutboundPort } from './answer-questionnaire.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuestionnaireEntity } from 'src/entities/answer-questionnaire.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerQuestionnaireRepository
  implements AnswerQuestionnaireRepositoryOutboundPort
{
  constructor(
    @InjectRepository(AnswerQuestionnaireEntity)
    private readonly answerQuestionnaireRepository: Repository<AnswerQuestionnaireEntity>
  ) {}
}
