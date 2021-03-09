import { ConvertCurrencyInterface } from '../interfaces';

export type ConversionContextState = 
{ status: 'ERROR'; message: string }
| { status: 'LOADED'; value: ConvertCurrencyInterface };