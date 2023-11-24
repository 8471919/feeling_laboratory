import { Injectable } from '@nestjs/common';
import { AnswerQuestionnaireRepositoryOutboundPort } from './answer-questionnaire.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuestionnaireEntity } from 'src/entities/answer-questionnaire.entity';
import { Repository } from 'typeorm';
import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';
import { FindAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire.dto';

@Injectable()
export class AnswerQuestionnaireRepository
  implements AnswerQuestionnaireRepositoryOutboundPort
{
  constructor(
    @InjectRepository(AnswerQuestionnaireEntity)
    private readonly answerQuestionnaireRepository: Repository<AnswerQuestionnaireEntity>
  ) {}

  async createAnswerQuestionnaire(
    createAnswerQuestionnaireDto: CreateAnswerQuestionnaireDto
  ): Promise<FindAnswerQuestionnaireDto> {
    const answerQuestionnaire = await this.answerQuestionnaireRepository.save(
      createAnswerQuestionnaireDto
    );

    return answerQuestionnaire;
  }
}
