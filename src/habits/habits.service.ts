import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Habit, Prisma } from '@prisma/client';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Habit[]> {
    return await this.prisma.habit.findMany();
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
