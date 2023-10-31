import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Ip,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PageViewService } from './page-view.service';
import { CreatePageViewDto } from './dto/create-page-view.dto';
import { IntervalType } from './types/interval.type';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('page-view')
export class PageViewController {
  constructor(private readonly pageViewService: PageViewService) {}

  @Post()
  create(
    @Body() createPageViewDto: CreatePageViewDto,
    @Req() request: Request,
    @Ip() ip: string,
  ) {
    return this.pageViewService.create(createPageViewDto, {
      domain: new URL(request.headers['origin']).hostname,
      ip: ip,
      userAgent: request.headers['user-agent'],
      referer: request.headers['referer'],
    });
  }

  @Get()
  findAll() {
    return this.pageViewService.findAll();
  }

  @Get('interval/:interval')
  @UseGuards(AuthGuard)
  findAllByInterval(
    @Param('interval') interval: IntervalType,
    @Req() request: Request,
  ) {
    return this.pageViewService.findAllByInterval(interval, request['user'].id);
  }

  @Get('interval/:interval/counter/:counterId')
  @UseGuards(AuthGuard)
  findByInterval(
    @Param('interval') interval: IntervalType,
    @Param('counterId') counterId: string,
  ) {
    return this.pageViewService.findByInterval(interval, +counterId);
  }

  @Get('last')
  @UseGuards(AuthGuard)
  findLast(@Query('limit') limit: string, @Req() request: Request) {
    return this.pageViewService.findLast(+limit, request['user'].id);
  }

  @Get('last/counter/:counterId')
  @UseGuards(AuthGuard)
  findLastByCounter(
    @Query('limit') limit: string,
    @Param('counterId') counterId: string,
  ) {
    return this.pageViewService.findLastByCounter(+limit, +counterId);
  }
}
