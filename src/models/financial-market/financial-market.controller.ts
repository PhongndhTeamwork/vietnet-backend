import { Controller, Get, HttpCode } from '@nestjs/common';
import { FinancialMarketService } from './financial-market.service';
import { ApiTags } from '@nestjs/swagger';


@Controller('financial-market')
@ApiTags('financial-market')
export class FinancialMarketController {
  constructor(private readonly financialMarketService: FinancialMarketService) {}

  @Get("all")
  getAll() {
    return this.financialMarketService.getAll()
  }


  @Get("health")
  @HttpCode(200)
  getHealth() {
    return {
      message : "Good"
    }
  }


  // @Get("quote")
  // getQuote() {
  //   return this.financialMarketService.getQuote()
  // }


}
