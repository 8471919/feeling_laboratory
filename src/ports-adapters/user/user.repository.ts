import { Injectable } from '@nestjs/common';
import { UserRepositoryOutboundPort } from './user.repository.outbound-port';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements UserRepositoryOutboundPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
}
