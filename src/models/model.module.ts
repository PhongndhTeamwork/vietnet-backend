import { Module } from '@nestjs/common';
import { FinancialMarketModule } from './financial-market/financial-market.module';


@Module({
  imports : [FinancialMarketModule],
  exports : [FinancialMarketModule]
})
export class ModelModule{}