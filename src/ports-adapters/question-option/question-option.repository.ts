import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionOptionRepositoryOutboundPort } from './question-option.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';
import { Repository } from 'typeorm';
import { CreateQuestionOptionEntityDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { FindQuestionOptionEntityOptionDto } from 'src/dtos/question-option/find-question-options-option.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';
import {
  UpdateQuestionOptionEntityDto,
  UpdateQuestionOptionEntityOptionDto,
} from 'src/dtos/question-option/update-question-option.dto';

@Injectable()
export class QuestionOptionRepository
  implements QuestionOptionRepositoryOutboundPort
{
  constructor(
    @InjectRepository(QuestionOptionEntity)
    private readonly questionOptionRepository: Repository<QuestionOptionEntity>
  ) {}

  async createQuestionOption(
    createQuestionOptionDto: CreateQuestionOptionEntityDto
  ): Promise<FindQuestionOptionEntityDto> {
    const questionOption = await this.questionOptionRepository.save(
      createQuestionOptionDto
    );

    return questionOption;
  }

  async findQuestionOptionList(
    options: FindQuestionOptionEntityOptionDto
  ): Promise<FindQuestionOptionEntityDto[]> {
    const questionOptionList = await this.questionOptionRepository.find({
      where: {
        ...options,
      },
    });

    if (questionOptionList.length === 0) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_FIND_QUESTION_OPTION);
    }

    return questionOptionList;
  }

  async updateQuestionOption(
    updateQuestionOptionDto: UpdateQuestionOptionEntityDto,
    options: UpdateQuestionOptionEntityOptionDto
  ): Promise<boolean> {
    const questionOption = await this.questionOptionRepository.update(
      options,
      updateQuestionOptionDto
    );

    if (questionOption.affected !== 1) {
      throw new BadRequestException(
        ERROR_MESSAGE.FAIL_TO_UPDATE_QUESTION_OPTION
      );
    }

    return true;
  }
}
