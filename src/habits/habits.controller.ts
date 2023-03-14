import { HabitsService } from './habits.service';
import { Controller, Get } from '@nestjs/common';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  findAll() {
    return this.habitsService.findAll();
  }
}
