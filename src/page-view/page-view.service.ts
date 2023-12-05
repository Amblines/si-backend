import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePageViewDto } from './dto/create-page-view.dto';
import { UserData } from './types/userData.type';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { IntervalType } from './types/interval.type';

@Injectable()
export class PageViewService {
  constructor(private prisma: PrismaService) {}

  async create(createPageViewDto: CreatePageViewDto, userData: UserData) {
    const counter = await this.prisma.counter.findUnique({
      where: {
        key: createPageViewDto.key,
      },
    });

    if (!counter || counter?.domain !== userData.domain) {
      throw new NotFoundException('Counter incorrect');
    }

    const fullUrl = new URL(createPageViewDto.url);

    return this.prisma.pageView.create({
      data: {
        userAgent: userData.userAgent,
        userIp: userData.ip,
        url: fullUrl.pathname + fullUrl.search,
        date: new Date(),
        referer: userData.referer,
        counter: {
          connect: {
            id: counter.id,
          },
        },
      },
    });
  }

  async findByInterval(interval: IntervalType, counterId: number) {
    const currentDate = dayjs();
    const intervals: IntervalType[] = ['day', 'week', 'month', 'year'];

    if (!intervals.includes(interval)) {
      throw new NotFoundException('Interval incorrect');
    }

    return this.prisma.pageView.count({
      where: {
        counterId,
        date: {
          gte: currentDate.subtract(1, interval).toISOString(),
          lte: currentDate.toDate().toISOString(),
        },
      },
    });
  }

  async findAllByInterval(interval: IntervalType, userId: number) {
    const currentDate = dayjs();
    const intervals: IntervalType[] = ['day', 'week', 'month', 'year'];

    if (!intervals.includes(interval)) {
      throw new NotFoundException('Interval incorrect');
    }

    return this.prisma.pageView.count({
      where: {
        counter: {
          userId: userId,
        },
        date: {
          gte: currentDate.subtract(1, interval).toISOString(),
          lte: currentDate.toDate().toISOString(),
        },
      },
    });
  }

  async findLast(limit: number, userId: number) {
    return this.prisma.pageView.findMany({
      where: {
        counter: {
          userId: userId,
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
      include: {
        counter: true,
      },
    });
  }

  async findLastByCounter(limit: number, counterId: number) {
    return this.prisma.pageView.findMany({
      where: {
        counterId,
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
      include: {
        counter: true,
      },
    });
  }

  async findWithUniqueUsersByCounter(counterId: number) {
    // count не поддерживает distinct
    const result = this.prisma.pageView.findMany({
      distinct: ['userIp'],
      where: {
        counterId,
      },
    });

    return (await result).length;
  }

  async findWithUniqueUsers(userId: number) {
    // count не поддерживает distinct
    const result = this.prisma.pageView.findMany({
      distinct: ['userIp'],
      where: {
        counter: {
          userId,
        },
      },
    });

    return (await result).length;
  }
}
