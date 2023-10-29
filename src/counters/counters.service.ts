import { Injectable } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class CountersService {
  constructor(private prisma: PrismaService) {}

  create(createCounterDto: CreateCounterDto, userId: number) {
    return this.prisma.counter.create({
      data: {
        domain: createCounterDto.domain,
        key: uuid(),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(user: User) {
    return this.prisma.counter.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.counter.findUnique({
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.counter.delete({
      where: {
        id: id,
      },
    });
  }
}
