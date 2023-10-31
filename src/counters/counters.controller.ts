import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CountersService } from './counters.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCounterDto: CreateCounterDto, @Req() request: Request) {
    return this.countersService.create(createCounterDto, request['user'].id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request: Request) {
    return this.countersService.findAll(request['user']);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.countersService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.countersService.remove(+id);
  }
}
