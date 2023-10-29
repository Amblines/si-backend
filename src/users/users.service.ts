import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create() {
    return this.prisma.user.create({
      data: {
        code: uuid(),
      },
    });
  }

  findOne(code: string) {
    return this.prisma.user.findUnique({
      where: {
        code: code,
      },
    });
  }
}
