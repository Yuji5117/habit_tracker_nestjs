import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Habit, Prisma } from '@prisma/client';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    startDayOfWeek: Date;
    endDayOfWeek: Date;
  }): Promise<Habit[]> {
    const { startDayOfWeek, endDayOfWeek } = params;

    return await this.prisma.habit.findMany({
      include: { habitStatuses: true },
      where: {
        habitStatuses: {
          every: {
            targetedDate: {
              gte: new Date(startDayOfWeek),
              lte: new Date(endDayOfWeek),
            },
          },
        },
      },
    });
  }

  async create(data: Prisma.HabitCreateInput): Promise<Habit> {
    return this.prisma.habit.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.HabitWhereUniqueInput;
    data: Prisma.HabitUpdateInput;
  }): Promise<Habit> {
    const { where, data } = params;
    return this.prisma.habit
      .update({
        where,
        data: {
          title: data.title,
        },
      })
      .catch((e) => {
        console.log('通信失敗');
        throw e;
      });
  }

  async delete(where: Prisma.HabitWhereUniqueInput): Promise<Habit> {
    return this.prisma.habit.delete({
      where,
    });
  }
}
