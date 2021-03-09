import { CurrenciesEnum } from '../enums';

export interface ConvertCurrencyInterface {
    from: CurrenciesEnum;
    to: CurrenciesEnum;
    amount: number;
    converted?: number;
    date?: Date 
}