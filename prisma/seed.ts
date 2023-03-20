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
        targetedDate: new Date('2023-03-15'),
      },
      {
        habitId: 1,
        isCompleted: true,
        targetedDate: new Date('2023-03-16'),
      },
      {
        habitId: 1,
        isCompleted: true,
        targetedDate: new Date('2023-03-17'),
      },
      {
        habitId: 2,
        isCompleted: true,
        targetedDate: new Date('2023-03-15'),
      },
      {
        habitId: 2,
        isCompleted: false,
        targetedDate: new Date('2023-03-16'),
      },
      {
        habitId: 2,
        isCompleted: true,
        targetedDate: new Date('2023-03-17'),
      },
      {
        habitId: 3,
        isCompleted: true,
        targetedDate: new Date('2023-03-10'),
      },
      {
        habitId: 4,
        isCompleted: true,
        targetedDate: new Date('2023-03-25'),
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
