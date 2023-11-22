import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionOptionRepositoryOutboundPort } from './question-option.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionOptionEntity } from 'src/entities/question-option.entity';
import { Repository } from 'typeorm';
import { CreateQuestionOptionDto } from 'src/dtos/question-option/create-question-option.dto';
import { FindQuestionOptionEntityDto } from 'src/dtos/question-option/find-question-option.dto';
import { FindQuestionOptionsOptionDto } from 'src/dtos/question-option/find-question-options-option.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';

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

  async findQuestionOptionList(
    options: FindQuestionOptionsOptionDto
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
}
