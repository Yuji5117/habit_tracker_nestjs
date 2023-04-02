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
import { HabitResponse } from './habits.models';

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
  async create(@Body() habitData: { title: string }): Promise<Habit> {
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

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) habitId: number): Promise<Habit> {
    return this.habitsService.delete({ habitId });
  }
}
