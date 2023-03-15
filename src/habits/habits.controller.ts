import { HabitsService } from './habits.service';
import { Controller, Get } from '@nestjs/common';
import { Habit } from '@prisma/client';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll(): Promise<Habit[]> {
    return this.habitsService.findAll();
  }
}
