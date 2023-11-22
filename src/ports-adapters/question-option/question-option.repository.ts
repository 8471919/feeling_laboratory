import { Injectable } from '@nestjs/common';
import { QuestionOptionRepositoryOutboundPort } from './question-option.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionOptionRepository
  implements QuestionOptionRepositoryOutboundPort
{
  constructor(
    @InjectRepository(QuestionOptionEntity)
    private readonly questionOptionRepository: Repository<QuestionOptionEntity>
  ) {}
}
