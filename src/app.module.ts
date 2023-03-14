import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [HabitsModule],
})
export class AppModule {}
