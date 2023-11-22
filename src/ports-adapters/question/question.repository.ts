import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepositoryOutboundPort } from './question.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from 'src/dtos/question/create-question.dto';
import { FindQuestionDto } from 'src/dtos/question/find-question.dto';
import { FindQuestionOptionDto } from 'src/dtos/question/find-question-option.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';

@Injectable()
export class QuestionRepository implements QuestionRepositoryOutboundPort {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto
  ): Promise<FindQuestionDto> {
    const question = await this.questionRepository.save(createQuestionDto);

    return question;
  }

  async findQuestionList(
    options: FindQuestionOptionDto
  ): Promise<FindQuestionDto[]> {
    const questionList = await this.questionRepository.find({
      where: {
        ...options,
      },
    });

    if (questionList.length === 0) {
      throw new BadRequestException(ERROR_MESSAGE.FAIL_TO_FIND_QUESTION);
    }

    return questionList;
  }
}
