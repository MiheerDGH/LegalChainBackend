import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // 1. 创建 Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  // 2. 随机 4 个普通用户 + 每人 3 份文档 + 1 份分析
  for (let i = 0; i < 4; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        name: faker.person.fullName(),
        role: 'USER',
      },
    });

    for (let j = 0; j < 3; j++) {
      const doc = await prisma.document.create({
        data: {
          title: faker.lorem.words({ min: 2, max: 5 }),
          url: `documents/${faker.string.uuid()}.pdf`,
          ownerId: user.id,
        },
      });

      await prisma.analysisResult.create({
        data: {
          docId: doc.id,
          riskScore: Number(faker.number.float({ min: 0, max: 1, precision: 0.01 })),
          summary: faker.lorem.sentence(),
        },
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
