import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerQuestionnaireRepositoryOutboundPort } from './answer-questionnaire.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuestionnaireEntity } from 'src/entities/answer-questionnaire.entity';
import { Repository } from 'typeorm';
import { CreateAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/create-answer-questionnaire.dto';
import { FindAnswerQuestionnaireDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire.dto';
import { FindAnswerQuestionnaireOptionDto } from 'src/dtos/answer-questionnaire/find-answer-questionnaire-option.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';

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

  async findAnswerQuestionnaireList(
    options: FindAnswerQuestionnaireOptionDto
  ): Promise<FindAnswerQuestionnaireDto[]> {
    const answerQuestionnaireList =
      await this.answerQuestionnaireRepository.find({
        where: {
          ...options,
        },
      });

    if (answerQuestionnaireList.length === 0) {
      throw new BadRequestException(
        ERROR_MESSAGE.FAIL_TO_FIND_ANSWER_QUESTIONNAIRE_LIST
      );
    }

    return answerQuestionnaireList;
  }

  async findAnswerQuestionnaire(
    answerQuestionnaireId: number
  ): Promise<FindAnswerQuestionnaireDto> {
    const answerQuestionnaire =
      await this.answerQuestionnaireRepository.findOne({
        where: {
          id: answerQuestionnaireId,
        },
        relations: {
          questionnaire: {
            questions: {
              questionOptions: true,
            },
          },
          answerQuestions: {
            question: true,
            questionOption: true,
          },
        },
        order: {
          questionnaire: {
            questions: {
              order: 'ASC',
              questionOptions: {
                order: 'ASC',
              },
            },
          },
        },
      });

    if (!answerQuestionnaire) {
      throw new BadRequestException(
        ERROR_MESSAGE.FAIL_TO_FIND_ANSWER_QUESTIONNAIRE
      );
    }

    return answerQuestionnaire;
  }

  async deleteAnswerQuestionnaire(
    answerQuestionnaireId: number
  ): Promise<boolean> {
    const answerQuestionnaire =
      await this.answerQuestionnaireRepository.findOne({
        where: {
          id: answerQuestionnaireId,
        },
        relations: {
          answerQuestions: true,
        },
      });

    if (!answerQuestionnaire) {
      throw new BadRequestException(
        ERROR_MESSAGE.FAIL_TO_DELETE_ANSWER_QUESTIONNAIRE
      );
    }

    await this.answerQuestionnaireRepository.softRemove(answerQuestionnaire);

    return true;
  }
}
