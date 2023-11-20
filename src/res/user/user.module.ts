import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_REPOSITORY_OUTBOUND_PORT } from 'src/ports-adapters/user/user.repository.outbound-port';
import { UserRepository } from 'src/ports-adapters/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY_OUTBOUND_PORT,
      useClass: UserRepository,
    },
    UserService,
  ],
})
export class UserModule {}
