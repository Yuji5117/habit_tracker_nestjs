import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const habit = await prisma.habit.createMany({
    data: [
      {
        title: 'ヨガ',
      },
      {
        title: '瞑想',
      },
      {
        title: '英語勉強',
      },
      {
        title: 'ランニング',
      },
    ],
  });

  const habitStatus = await prisma.habitStatus.createMany({
    data: [
      {
        habitId: 1,
        isCompleted: true,
        targetedDate: new Date('2023-04-02'),
      },
      {
        habitId: 1,
        isCompleted: true,
        targetedDate: new Date('2023-04-03'),
      },
      {
        habitId: 1,
        isCompleted: true,
        targetedDate: new Date('2023-04-04'),
      },
      {
        habitId: 2,
        isCompleted: true,
        targetedDate: new Date('2023-04-02'),
      },
      {
        habitId: 2,
        isCompleted: false,
        targetedDate: new Date('2023-04-03'),
      },
      {
        habitId: 2,
        isCompleted: true,
        targetedDate: new Date('2023-04-04'),
      },
      {
        habitId: 3,
        isCompleted: true,
        targetedDate: new Date('2023-04-10'),
      },
      {
        habitId: 4,
        isCompleted: true,
        targetedDate: new Date('2023-04-25'),
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
