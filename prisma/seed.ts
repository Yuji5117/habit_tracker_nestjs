import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const habit = await prisma.habit.create({
    data: {
      title: 'ヨガ',
    },
  });

  console.log(habit);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
