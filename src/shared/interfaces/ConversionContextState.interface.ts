import { ConvertCurrencyInterface } from "./ConvertCurrency.interface";

export interface ConversionContextStateInterface { 
    status: string;
    value: ConvertCurrencyInterface;
    history: ConvertCurrencyInterface[];
};