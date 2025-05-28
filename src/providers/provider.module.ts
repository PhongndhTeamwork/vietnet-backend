import { Module } from '@nestjs/common';
import { MongoProvider } from '@provider/mongo.provider';
import { ScheduleProvider } from '@provider/schedule.provider';


@Module({
  imports : [MongoProvider, ScheduleProvider],
  exports :[MongoProvider, ScheduleProvider]
})
export class ProviderModule{}