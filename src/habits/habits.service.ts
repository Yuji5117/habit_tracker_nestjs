import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Habit, HabitStatus } from '@prisma/client';
import { HabitResponse, HabitStatusResponse } from './habits.models';

const days = [0, 1, 2, 3, 4, 5, 6];

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

          if (hasHabitStatus) return hasHabitStatus;

          return {
            habitId: habit.habitId,
            isCompleted: false,
            targetedDate: new Date(
              new Date(startDayOfWeek).setDate(
                new Date(startDayOfWeek).getDate() + day,
              ),
            ),
          };
        },
      );

      return { ...habit, habitStatuses: targetedHabitStatusesForWeek };
    });
    return habitsResponse;
  }

  async create(data: any): Promise<HabitResponse> {
    const responese = await this.prisma.habit.create({
      data: {
        title: data.title,
      },
    });

    const initialHabitStatuses = days.map((day) => {
      return {
        habitId: responese.habitId,
        isCompleted: false,
        targetedDate: new Date(
          new Date(data.startDayOfWeek).setDate(
            new Date(data.startDayOfWeek).getDate() + day,
          ),
        ),
      };
    });

    return { ...responese, habitStatuses: initialHabitStatuses };
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

  async createStatus(data: any) {
    const responese = await this.prisma.habitStatus.create({
      data,
    });

    return responese;
  }

  async updateStatus({ statusId, isCompleted }) {
    return this.prisma.habitStatus.update({
      where: {
        habitStatusId: statusId,
      },
      data: {
        isCompleted,
      },
    });
  }

  async delete(where: Prisma.HabitWhereUniqueInput): Promise<Habit> {
    return this.prisma.habit.delete({
      where,
    });
  }
}
