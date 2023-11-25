import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerQuestionRepositoryOutboundPort } from './answer-question.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuestionEntity } from 'src/entities/answer-question.entity';
import { Repository } from 'typeorm';
import { CreateAnswerQuestionDto } from 'src/dtos/answer-question/create-answer-question.dto';
import { FindAnswerQuestionDto } from 'src/dtos/answer-question/find-answer-question.dto';
import {
  UpdateAnswerQuestionDto,
  UpdateAnswerQuestionOptionDto,
} from 'src/dtos/answer-question/update-answer-question.dto';
import { ERROR_MESSAGE } from 'src/utils/constants/error-message';

@Injectable()
export class AnswerQuestionRepository
  implements AnswerQuestionRepositoryOutboundPort
{
  constructor(
    @InjectRepository(AnswerQuestionEntity)
    private readonly answerQuestionRepository: Repository<AnswerQuestionEntity>
  ) {}

  async createAnswerQuestion(
    createAnswerQuestionDto: CreateAnswerQuestionDto
  ): Promise<FindAnswerQuestionDto> {
    const answerQuestion = await this.answerQuestionRepository.save(
      createAnswerQuestionDto
    );

    return answerQuestion;
  }

  async updateAnswerQuestion(
    updateAnswerQuestionDto: UpdateAnswerQuestionDto,
    options: UpdateAnswerQuestionOptionDto
  ): Promise<boolean> {
    const answerQuestion = await this.answerQuestionRepository.update(
      {
        ...options,
      },
      updateAnswerQuestionDto
    );

    if (answerQuestion.affected !== 1) {
      throw new BadRequestException(
        ERROR_MESSAGE.FAIL_TO_UPDATE_ANSWER_QUESTION
      );
    }

    return true;
  }
}
