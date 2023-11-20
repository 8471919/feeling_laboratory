// import { Injectable } from '@nestjs/common';
// import { UserRepositoryOutboundPort } from './user.repository.outbound-port';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserEntity } from 'src/entities/user.entity';
// import { Repository } from 'typeorm';
// import { CreateUserDto } from 'src/dtos/user/create-user.dto';
// import { UserInfoDto } from 'src/dtos/user/user-info.dto';

// @Injectable()
// export class UserRepository implements UserRepositoryOutboundPort {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>
//   ) {}
//   async createUser(userInfo: CreateUserDto): Promise<UserInfoDto> {
//     const user = await this.userRepository.save({
//       ...userInfo,
//     });

//     const { password, ...res } = user;

//     return res;
//   }
// }
