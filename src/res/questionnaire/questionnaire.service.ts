import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT,
  QuestionnaireRepositoryOutboundPort,
} from '../../ports-adapters/questionnaire/questionnaire.repository.outbound-port';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { FindQuestionnaireDto } from 'src/dtos/questionnaire/find-questionnaire.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @Inject(QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT)
    private readonly questionnaireRepository: QuestionnaireRepositoryOutboundPort
  ) {}

  async createQuestionnaire(
    createQuestionnaireDto: CreateQuestionnaireDto
  ): Promise<FindQuestionnaireDto> {
    const questionnaire =
      await this.questionnaireRepository.createQuestionnaire(
        createQuestionnaireDto
      );

    return questionnaire;
  }

  async getQuestionnaireById(id: number): Promise<FindQuestionnaireDto> {
    const questionnaireList =
      await this.questionnaireRepository.findQuestionnaireList({
        id,
      });

    if (questionnaireList.length > 1) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    return questionnaireList[0];
  }
}
