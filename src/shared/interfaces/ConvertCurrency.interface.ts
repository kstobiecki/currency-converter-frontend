import { CurrenciesEnum } from '../enums';

export interface ConvertCurrencyInterface {
    from: CurrenciesEnum;
    to: CurrenciesEnum;
    amount: number;
    date: Date;
    conversion: number;
    converted: number;
}