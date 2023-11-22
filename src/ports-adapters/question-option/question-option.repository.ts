import { Injectable } from '@nestjs/common';
import { QuestionOptionRepositoryOutboundPort } from './question-option.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';
import { Repository } from 'typeorm';
import { CreateQuestionOptionDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';

@Injectable()
export class QuestionOptionRepository
  implements QuestionOptionRepositoryOutboundPort
{
  constructor(
    @InjectRepository(QuestionOptionEntity)
    private readonly questionOptionRepository: Repository<QuestionOptionEntity>
  ) {}

  async createQuestionOption(
    createQuestionOptionDto: CreateQuestionOptionDto
  ): Promise<FindQuestionOptionEntityDto> {
    const questionOption = await this.questionOptionRepository.save(
      createQuestionOptionDto
    );

    return questionOption;
  }
}
