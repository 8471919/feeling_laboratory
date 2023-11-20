// import { Inject, Injectable } from '@nestjs/common';
// import { CreateUserDto } from 'src/dtos/user/create-user.dto';
// import { UserInfoDto } from 'src/dtos/user/user-info.dto';
// import {
//   USER_REPOSITORY_OUTBOUND_PORT,
//   UserRepositoryOutboundPort,
// } from 'src/ports-adapters/user/user.repository.outbound-port';

// @Injectable()
// export class UserService {
//   constructor(
//     @Inject(USER_REPOSITORY_OUTBOUND_PORT)
//     private readonly userRepository: UserRepositoryOutboundPort
//   ) {}

//   async register(userInfo: CreateUserDto): Promise<UserInfoDto> {
//     const user = await this.userRepository.createUser(userInfo);

//     return user;
//   }
// }
