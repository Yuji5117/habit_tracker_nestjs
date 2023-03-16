import { HabitsService } from './habits.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Habit } from '@prisma/client';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(): Promise<Habit[]> {
    return this.habitsService.findAll();
  }

  @Post()
  create(@Body() habitData: { title: string }): Promise<Habit> {
    console.log(habitData);
    return this.habitsService.create(habitData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) habitId: number): Promise<Habit> {
    console.log(habitId);
    return this.habitsService.delete({ habitId });
  }
}
