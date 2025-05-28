import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FinancialMarketService } from '@model/financial-market/financial-market.service';
import { SymbolEnum } from '@enum/symbol.enum';
import { DataGateway } from '@service/gateway/data.gateway';

@Injectable()
export class ScheduleService {
  constructor(
    // @InjectQueue('recalculate-story-transaction')
    // private readonly storyTransactionRecalculationQueue: Queue,
    // @InjectQueue('recalculate-ton-transaction')
    // private readonly tonTransactionRecalculationQueue: Queue,
    private readonly financialMarketService: FinancialMarketService,
    private readonly gateway: DataGateway,
  ) {}

  @Cron('*/15 * * * * *', { timeZone: 'Etc/UTC' }) async handleCron() {
    const IXICData = await this.financialMarketService.getQuote(
      SymbolEnum.NASDAQ,
    );
    const DJIData = await this.financialMarketService.getQuote(
      SymbolEnum.DowJones,
    );
    const GSPCData = await this.financialMarketService.getQuote(
      SymbolEnum.SP500,
    );
    console.log('Done at ' + Date.now());
    const data = {
      nasdaqData: IXICData,
      dowData: DJIData,
      sp500Data: GSPCData,
      nasdaqRecommendation: await this.financialMarketService.getRecommendation(
        SymbolEnum.NASDAQ,
      ),
      sp500Recommendation: await this.financialMarketService.getRecommendation(
        SymbolEnum.SP500,
      ),
      dowRecommendation: await this.financialMarketService.getRecommendation(
        SymbolEnum.DowJones,
      ),
    };
    this.gateway.sendMarketDataToClients(data);
  }
}