import { Controller, Get } from '@nestjs/common';
import { FinancialMarketService } from './financial-market.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('financial-market')
@ApiTags('financial-market')
export class FinancialMarketController {
  constructor(private readonly financialMarketService: FinancialMarketService) {}



  @Get("symbol")
  getSymbol() {
    return this.financialMarketService.getSymbol()
  }

  @Get("all")
  getAll() {
    return this.financialMarketService.getAll()
  }

  @Get("yahoo-finance")
  getYahooFinance() {
    return this.financialMarketService.getYahooFinance()
  }



  // @Get("quote")
  // getQuote() {
  //   return this.financialMarketService.getQuote()
  // }


}
