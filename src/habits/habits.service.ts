import { Injectable } from '@nestjs/common';

@Injectable()
export class HabitsService {
  findAll() {
    return 'Get All Habits';
  }
}
