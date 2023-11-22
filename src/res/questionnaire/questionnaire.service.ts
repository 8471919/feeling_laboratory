import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT,
  QuestionnaireRepositoryOutboundPort,
} from '../../ports-adapters/questionnaire/questionnaire.repository.outbound-port';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { FindQuestionnaireDto } from 'src/dtos/questionnaire/find-questionnaire.dto';
import { UpdateQuestionnaireDto } from 'src/dtos/questionnaire/update-questionnaire.dto';

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

    return questionnaireList[0];
  }

  async modifyQuestionnaireById(
    updateQuestionnaireDto: UpdateQuestionnaireDto,
    id: number
  ): Promise<boolean> {
    const isUpdated = await this.questionnaireRepository.updateQuestionnaire(
      updateQuestionnaireDto,
      { id }
    );

    return isUpdated;
  }
}
