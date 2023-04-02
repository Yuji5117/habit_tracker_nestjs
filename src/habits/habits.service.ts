import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Habit, HabitStatus } from '@prisma/client';
import { HabitResponse, HabitStatusResponse } from './habits.models';

@Injectable()
export class HabitsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ startDayOfWeek, endDayOfWeek }): Promise<any> {
    const habits: Habit[] = await this.prisma.habit.findMany({});

    const habitIds: number[] = habits.map((habit) => habit.habitId);

    const habitStatusesFromDB: HabitStatus[] =
      await this.prisma.habitStatus.findMany({
        where: {
          AND: [
            {
              habitId: {
                in: habitIds,
              },
              targetedDate: {
                gte: new Date(startDayOfWeek),
                lte: new Date(endDayOfWeek),
              },
            },
          ],
        },
        orderBy: [
          {
            habitId: 'asc',
          },
          {
            targetedDate: 'asc',
          },
        ],
      });

    const days = [0, 1, 2, 3, 4, 5, 6];

    const habitsResponse: HabitResponse[] = habits.map((habit: Habit) => {
      const targetedHabitStatuses: HabitStatus[] = habitStatusesFromDB.filter(
        (status) => status.habitId === habit.habitId,
      );

      const targetedHabitStatusesForWeek: HabitStatusResponse[] = days.map(
        (day) => {
          const hasHabitStatus = targetedHabitStatuses.find(
            (targetedHabitStatuse) => {
              const targetedDay = new Date(startDayOfWeek);

              return (
                targetedHabitStatuse.targetedDate.getTime() ===
                new Date(
                  targetedDay.setDate(targetedDay.getDate() + day),
                ).getTime()
              );
            },
          );

          if (hasHabitStatus) {
            return hasHabitStatus;
          } else {
            return {
              habitId: habit.habitId,
              isCompleted: false,
              targetedDate: new Date(
                new Date(startDayOfWeek).setDate(
                  new Date(startDayOfWeek).getDate() + day,
                ),
              ),
            };
          }
        },
      );

      return { ...habit, habitStatuses: targetedHabitStatusesForWeek };
    });
    return habitsResponse;
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
