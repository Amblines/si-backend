import { Controller, Get, Post, Body, Param, Req, Ip } from '@nestjs/common';
import { PageViewService } from './page-view.service';
import { CreatePageViewDto } from './dto/create-page-view.dto';

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
    });
  }

  @Get()
  findAll() {
    return this.pageViewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageViewService.findOne(+id);
  }
}
