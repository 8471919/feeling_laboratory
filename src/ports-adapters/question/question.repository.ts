import { Injectable } from '@nestjs/common';
import { QuestionRepositoryOutboundPort } from './question.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { FindQuestionDto } from 'src/dtos/question/find-question.dto';

@Injectable()
export class QuestionRepository implements QuestionRepositoryOutboundPort {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto
  ): Promise<FindQuestionDto> {
    const question = await this.questionRepository.create(createQuestionDto);

    return question;
  }
}
