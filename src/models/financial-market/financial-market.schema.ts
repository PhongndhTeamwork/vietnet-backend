import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type FinancialMarketDocument = HydratedDocument<FinancialMarketEntity>


@Schema({
  timestamps: true,
  collection: 'financial_market',
})
export class FinancialMarketEntity {

  @Prop()
  name : string

  @Prop()
  symbol : string

  @Prop()
  price : number

  @Prop()
  change : number

  @Prop()
  dayLow : number

  @Prop()
  dayHigh : number

  @Prop()
  open : number

  @Prop()
  volume : number

  @Prop()
  previousClose : number

  @Prop()
  timestamp : Date
}

export const FinancialMarketSchema = SchemaFactory.createForClass(FinancialMarketEntity);