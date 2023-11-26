import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionnaireRepositoryOutboundPort } from './questionnaire.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { FindQuestionnaireDto } from 'src/dtos/questionnaire/find-questionnaire.dto';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';
import { Repository } from 'typeorm';
import { FindQuestionnaireOptionDto } from 'src/dtos/questionnaire/find-questionnaire-option.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';
import {
  UpdateQuestionnaireDto,
  UpdateQuestionnaireOptionDto,
} from 'src/dtos/questionnaire/update-questionnaire.dto';

@Injectable()
export class QuestionnaireRepository
  implements QuestionnaireRepositoryOutboundPort
{
  constructor(
    @InjectRepository(QuestionnaireEntity)
    private readonly questionnaireRepository: Repository<QuestionnaireEntity>
  ) {}

  async createQuestionnaire(
    createQuestionnaireDto: CreateQuestionnaireDto
  ): Promise<FindQuestionnaireDto> {
    const questionnaire = await this.questionnaireRepository.save(
      createQuestionnaireDto
    );

    return questionnaire;
  }

  async findQuestionnaireList(
    options: FindQuestionnaireOptionDto
  ): Promise<FindQuestionnaireDto[]> {
    const questionnaireList = await this.questionnaireRepository.find({
      where: {
        ...options,
      },
      relations: {
        questions: {
          questionOptions: true,
        },
      },
      order: {
        questions: {
          order: 'ASC',
          questionOptions: {
            order: 'ASC',
          },
        },
      },
    });

    if (questionnaireList.length === 0) {
      throw new BadRequestException(ERROR_MESSAGE.NOT_FOUND_QUESTIONNAIRE);
    }

    return questionnaireList;
  }

  async updateQuestionnaire(
    updateQuestionnaireDto: UpdateQuestionnaireDto,
    options: UpdateQuestionnaireOptionDto
  ): Promise<boolean> {
    const questionnaire = await this.questionnaireRepository.update(
      options,
      updateQuestionnaireDto
    );

    if (questionnaire.affected !== 1) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_UPDATE_QUESTIONNAIRE);
    }

    return true;
  }

  async deleteQuestionnaire(id: number): Promise<boolean> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: {
        id,
      },
      relations: {
        questions: {
          questionOptions: true,
        },
      },
    });

    if (!questionnaire) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_DELETE_QUESTIONNAIRE);
    }

    await this.questionnaireRepository.softRemove(questionnaire);

    return true;
  }
}
