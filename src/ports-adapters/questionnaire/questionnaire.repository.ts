import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionnaireRepositoryOutboundPort } from './questionnaire.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionnaireDto } from 'src/dtos/questionnaire/create-questionnaire.dto';
import { FindQuestionnaireDto } from 'src/dtos/questionnaire/find-questionnaire.dto';
import { QuestionnaireEntity } from 'src/entities/questionnaire.entity';
import { Repository } from 'typeorm';
import { FindQuestionnaireOptionDto } from 'src/dtos/questionnaire/find-questionnaire-option.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';

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
    });

    if (questionnaireList.length === 0) {
      throw new BadRequestException(ERROR_MESSAGE.NOT_FOUND_QUESTIONNAIRE);
    }

    return questionnaireList;
  }
}
