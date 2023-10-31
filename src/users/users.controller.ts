import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CheckUserDto } from './dto/check-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create() {
    return this.usersService.create();
  }

  @Post('/check')
  async check(@Body() checkUserDto: CheckUserDto) {
    const user = await this.usersService.findOne(checkUserDto.code);

    if (!user) {
      throw new UnauthorizedException(
        'Пользователя с таким кодом не существует',
      );
    }

    return user;
  }
}
