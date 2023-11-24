import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';
import { FindAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire.dto';
import {
  ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT,
  AnswerQuestionnaireRepositoryOutboundPort,
} from 'src/ports-adapters/answer-questionnaire/answer-questionnaire.repository.outbound-port';

@Injectable()
export class AnswerQuestionnaireService {
  constructor(
    @Inject(ANSWER_QUESTIONNAIRE_REPOSITORY_OUTBOUND_PORT)
    private readonly answerQuestionnaireRepository: AnswerQuestionnaireRepositoryOutboundPort
  ) {}

  async createAnswerQustionnaire(
    createAnswerQuestionnaireDto: CreateAnswerQuestionnaireDto
  ): Promise<FindAnswerQuestionnaireDto> {
    const answerQuestionnaire =
      await this.answerQuestionnaireRepository.createAnswerQuestionnaire(
        createAnswerQuestionnaireDto
      );

    return answerQuestionnaire;
  }

  async getAnswerQuestionList(
    questionnaireId: number
  ): Promise<FindAnswerQuestionnaireDto[]> {
    const answerQuestionList =
      await this.answerQuestionnaireRepository.findAnswerQuestionnaireList({
        questionnaireId,
      });

    return answerQuestionList;
  }
}
