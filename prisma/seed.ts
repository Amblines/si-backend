import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { code: 'test' },
    update: {},
    create: {
      code: 'test',
    },
  });
  const counter = await prisma.counter.upsert({
    where: {
      key: 'test',
    },
    update: {},
    create: {
      domain: 'test.local',
      key: 'test',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
