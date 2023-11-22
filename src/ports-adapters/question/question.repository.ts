import { Injectable } from '@nestjs/common';
import { QuestionRepositoryOutboundPort } from './question.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionRepository implements QuestionRepositoryOutboundPort {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>
  ) {}
}
