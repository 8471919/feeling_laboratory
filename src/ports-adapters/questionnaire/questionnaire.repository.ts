import { Injectable } from '@nestjs/common';
import { QuestionnaireRepositoryOutboundPort } from './questionnaire.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionnaireRepository
  implements QuestionnaireRepositoryOutboundPort
{
  constructor(
    @InjectRepository(QuestionnaireEntity)
    private readonly questionnaireRepository: Repository<QuestionnaireEntity>
  ) {}
}
