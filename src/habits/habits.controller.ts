import { HabitsService } from './habits.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Habit } from '@prisma/client';
import { HabitResponse, HabitStatusResponse } from './habits.models';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  async findAll(
    @Query() params: { startDayOfWeek: Date; endDayOfWeek: Date },
  ): Promise<HabitResponse[]> {
    return this.habitsService.findAll(params);
  }

  @Post()
  async create(
    @Body() habitData: { title: string; startDayOfWeek: Date },
  ): Promise<Habit> {
    return this.habitsService.create(habitData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) habitId: number,
    @Body('title') title: string,
  ): Promise<Habit> {
    return this.habitsService.update({
      where: { habitId },
      data: { title },
    });
  }

  @Post(':id/statuses')
  async createStatus(
    @Param('id', ParseIntPipe) habitId: number,
    @Body('isCompleted') isCompleted: boolean,
    @Body('targetedDate') targetedDate: string,
  ): Promise<HabitStatusResponse> {
    return await this.habitsService.createStatus({
      habitId,
      isCompleted,
      targetedDate,
    });
  }

  @Put(':id/statuses/:statusId')
  async updateStatus(
    @Param('statusId', ParseIntPipe) statusId: number,
    @Body('isCompleted') isCompleted: boolean,
  ): Promise<HabitStatusResponse> {
    return await this.habitsService.updateStatus({
      statusId,
      isCompleted,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) habitId: number): Promise<Habit> {
    return this.habitsService.delete({ habitId });
  }
}
