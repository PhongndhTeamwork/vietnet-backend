import { Module } from '@nestjs/common';
import { ScheduleService } from '@service/schedule/schedule.service';
import { FinancialMarketService } from '@model/financial-market/financial-market.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialMarketEntity, FinancialMarketSchema } from '@model/financial-market/financial-market.schema';
import { DataGateway } from '@service/gateway/data.gateway';



@Module({
  imports : [
    MongooseModule.forFeature([{
      name : FinancialMarketEntity.name,
      schema : FinancialMarketSchema
    }])
  ],
  providers : [
    ScheduleService,
    FinancialMarketService,
    DataGateway
  ]
})
export class ScheduleModule{}