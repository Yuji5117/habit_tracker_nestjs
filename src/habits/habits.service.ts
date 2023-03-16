import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Habit, Prisma } from '@prisma/client';
// import { Habit } from './habits.models';

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

  async delete(where: Prisma.HabitWhereUniqueInput): Promise<Habit> {
    return this.prisma.habit.delete({
      where,
    });
  }
}
