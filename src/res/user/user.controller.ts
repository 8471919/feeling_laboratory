import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/user/create-user.dto';
import { UserInfoDto } from 'src/dtos/user/user-info.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: CreateUserDto): Promise<UserInfoDto> {
    const user = await this.userService.register(body);

    return user;
  }
}
