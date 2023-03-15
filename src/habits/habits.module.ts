import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService, PrismaService],
})
export class HabitsModule {}
