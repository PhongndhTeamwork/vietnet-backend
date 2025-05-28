import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { FinancialMarketEntity } from '@model/financial-market/financial-market.schema';
import { Model } from 'mongoose';
import { SymbolEnum } from '@enum/symbol.enum';
import yahooFinance from 'yahoo-finance2';
import * as console from 'node:console';

@Injectable()
export class FinancialMarketService {
  private readonly FmtApi: string = '';

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(FinancialMarketEntity.name)
    private financialMarketModel: Model<FinancialMarketEntity>,
  ) {
    this.FmtApi = this.configService.getOrThrow('FMT_API');
  }

  async getSymbol() {
    try {
      const res = await axios.get(
        `https://financialmodelingprep.com/stable/search-symbol?query=AAPL&apikey=${this.FmtApi}`,
      );
      return res.data;
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  async getYahooFinance() {
    try {
      return await yahooFinance.quote("^DJI");
    }catch (e) {
      console.log(e)
      return new InternalServerErrorException(e)
    }
  }

  async getQuote(name : SymbolEnum) {
    try {
      // const res = await axios.get(
      //   `https://financialmodelingprep.com/stable/quote?symbol=${name}&apikey=${this.FmtApi}`,
      // );
      // const quote = res.data[0];
      const quote = await yahooFinance.quote(name);


      return await this.financialMarketModel.create({
        symbol: quote.symbol,
        name: quote.longName,
        price: quote.regularMarketPrice,
        change: quote.regularMarketChangePercent,
        dayLow: quote.regularMarketDayRange?.low,
        dayHigh: quote.regularMarketDayRange?.high,
        open: quote.regularMarketOpen,
        volume : quote.regularMarketVolume,
        previousClose: quote.regularMarketPreviousClose,
        timestamp : quote.regularMarketTime ? new Date(quote.regularMarketTime) : null
      });
    } catch (e) {
      // console.log(e)
      return new InternalServerErrorException(e);
    }
  }

  async getAll() {
    try {
      const marketData : any = await this.financialMarketModel.find().sort({ createdAt: -1 }).limit(300).lean();

      const returningData = {
        nasdaqData : [] as any[],
        sp500Data : [] as any[],
        dowData : [] as any[],
        nasdaqRecommendation : "no",
        sp500Recommendation : "no",
        dowRecommendation : "no",
      }

      for (const data of marketData) {
        if (data.symbol === SymbolEnum.SP500) {
          returningData.sp500Data.push(data);
        } else if (data.symbol === SymbolEnum.NASDAQ) {
          returningData.nasdaqData.push(data);
        } else if (data.symbol === SymbolEnum.DowJones) {
          returningData.dowData.push(data);
        }
      }

      returningData.nasdaqRecommendation = this.getRecommendationByData(returningData.nasdaqData)
      returningData.sp500Recommendation = this.getRecommendationByData(returningData.sp500Data)
      returningData.dowRecommendation = this.getRecommendationByData(returningData.dowData)

      return returningData;

    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }

  async getRecommendation(symbol : SymbolEnum) {
    const data : any = await this.financialMarketModel.find({
      symbol : symbol
    }).where().sort({ createdAt: -1 }).limit(6).lean();
    return this.getRecommendationByData(data)
  }

  private getRecommendationByData(data: any): string {
    if (data.length < 5) return "No";

    const lastFive = data.slice(-5); // get last 5 entries
    const avgPreviousClose =
      lastFive.reduce((sum, item) => sum + item.previousClose, 0) / 5;

    const latestPrice = data[data.length - 1].price;

    return latestPrice > avgPreviousClose * 1.05 ? "Sell" : "Buy";
  }
}
