import { Module } from '@nestjs/common';
import { ScheduleModule } from '@service/schedule/schedule.module';


@Module({
  imports : [ScheduleModule],
  exports : [ScheduleModule]
})
export class ServiceModule{}