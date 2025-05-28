import { FinancialMarketDocument } from '@model/financial-market/financial-market.schema';

export type MarketType = {
  name: string;
  symbol: string;
  price: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearLow: number;
  yearHigh: number;
  open: number;
  previousClose: number;
}

export type ReturningType = {
  IXIC : FinancialMarketDocument,
  DJI : FinancialMarketDocument,
  GSPC : FinancialMarketDocument
}