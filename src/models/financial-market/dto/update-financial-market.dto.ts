import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialMarketDto } from './create-financial-market.dto';

export class UpdateFinancialMarketDto extends PartialType(CreateFinancialMarketDto) {}
