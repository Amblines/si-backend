import { Module } from '@nestjs/common';
import { PageViewService } from './page-view.service';
import { PageViewController } from './page-view.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PageViewController],
  providers: [PageViewService, PrismaService],
})
export class PageViewModule {}
