import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageViewDto } from './dto/create-page-view.dto';
import { UserData } from './types/userData.type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PageViewService {
  constructor(private prisma: PrismaService) {}

  async create(createPageViewDto: CreatePageViewDto, userData: UserData) {
    const counter = await this.prisma.counter.findUnique({
      where: {
        key: createPageViewDto.key,
      },
    });

    if (!counter && counter?.domain !== userData.domain) {
      throw new NotFoundException('Counter incorrect');
    }

    const fullUrl = new URL(createPageViewDto.url);

    return this.prisma.pageView.create({
      data: {
        userAgent: userData.userAgent,
        userIp: userData.ip,
        url: fullUrl.pathname + fullUrl.search,
        date: new Date(),
        counter: {
          connect: {
            id: counter.id,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all pageView`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageView`;
  }
}
