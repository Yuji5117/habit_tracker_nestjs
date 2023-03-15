import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Habit } from '@prisma/client';
// import { Habit } from './habits.models';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Habit[]> {
    return await this.prisma.habit.findMany();
  }
}
