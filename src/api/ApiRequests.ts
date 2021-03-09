import axios, { AxiosPromise } from 'axios';
import { ConvertCurrencyInterface } from '../shared/interfaces';

export const convertCurrency = (body: { to: string, from: string, amount: number }): Promise<{ data: ConvertCurrencyInterface }> =>
                axios.post('http://localhost:9000/converter', body, {
                    headers: { 'content-type': 'application/json' }
                });
 