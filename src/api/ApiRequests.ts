import axios from 'axios';
import qs from 'qs';
import { ConvertCurrencyInterface } from '../shared/interfaces';

export const convertCurrency = (data: { to: string, from: string,amount: string}): Promise<ConvertCurrencyInterface> =>
                axios.post('http://localhost:9000/converter', { data: qs.stringify(data), headers: {'Content-Type': 'application/json' }});
