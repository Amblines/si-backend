import { Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create() {
    return this.usersService.create();
  }

  @Get(':id')
  findOne(@Param('id') code: string) {
    return this.usersService.findOne(code);
  }
}
