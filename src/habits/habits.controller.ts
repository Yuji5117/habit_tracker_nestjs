import { HabitsService } from './habits.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Habit, Prisma } from '@prisma/client';

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
}
