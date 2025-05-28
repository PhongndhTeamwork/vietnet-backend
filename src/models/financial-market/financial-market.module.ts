import { Module } from '@nestjs/common';
import { FinancialMarketService } from './financial-market.service';
import { FinancialMarketController } from './financial-market.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialMarketEntity, FinancialMarketSchema } from '@model/financial-market/financial-market.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{
      name : FinancialMarketEntity.name,
      schema : FinancialMarketSchema
    }])
  ],
  controllers: [FinancialMarketController],
  providers: [FinancialMarketService],
})
export class FinancialMarketModule {}
