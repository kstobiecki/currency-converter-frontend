import React, { FunctionComponent, useState, createContext, useContext, useEffect } from 'react';
import styles from './ConverterForm.module.scss'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import * as ApiRequests from '../../../api/ApiRequests';
import { ConvertCurrencyInterface } from '../../../shared/interfaces';
import { CurrenciesEnum } from '../../../shared/enums'
import { ZodRawShape } from 'zod/lib/src/types/base';
import { ConversionContextState } from '../../../shared/types';

const Context = createContext<ConversionContextState | null>(null);

export const useConversionData = (): ConversionContextState => {
  const contextState = useContext(Context);
  if (contextState === null) {
    throw new Error('useConversionData must be used within a ConverterForm tag');
  }
  return contextState;
};

const schema: z.ZodObject<ZodRawShape> = z.object({
    amount: z.number(),
    to: z.string(),
    from: z.string(),
  })
  .refine((data: { amount: number; to: string; from: string; }) => 
    data.from !== data.to, {
      message: 'Please choose different currency',
      path: ['to']
    })

const ConverterForm: FunctionComponent<{ children: React.ReactNode }> = (props: { children: React.ReactNode }) => {
    const initialValue = {
        from: CurrenciesEnum.EUR,
        to: CurrenciesEnum.USD,
        amount: 1
    }
    const { register, handleSubmit, errors } = useForm({
        resolver: zodResolver(schema),
    });
    const [inputAmount, setAmount] = useState('');
    const [state, setState] = useState<ConversionContextState>({ 
        status: 'LOADED',
        value: initialValue
    });
    const convertCurrency = async ({ from, to, amount }: ConvertCurrencyInterface) => {
        try {
            const fixedAmount = amount.toFixed(2);
            setAmount(fixedAmount);
            const response: ConvertCurrencyInterface = await ApiRequests.convertCurrency({ from, to, amount: fixedAmount });
            setState({
                status: 'LOADED',
                value: response
            });
        } catch (error) {
            setState({ status: 'ERROR', message: 'Unable to load data' });
        }
    }
    useEffect(() => {
        convertCurrency(initialValue)
    }, []);

    return (
        <Context.Provider value={state}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(convertCurrency)}>
                    <div className={styles.inputContainer}>
                        <label>Amount</label>
                        <input name="amount" ref={register({ valueAsNumber: true })} value={inputAmount} onChange={e => setAmount(e.target.value)}/>
                        {errors.amount && <p>Please enter a valid amount</p>}
                    </div>
                    <div className={styles.selectContainer}>
                        <label>From</label>
                        <select name="from" ref={register} defaultValue={CurrenciesEnum.EUR}>
                            <option value={CurrenciesEnum.USD}>US Dollar</option>
                            <option value={CurrenciesEnum.EUR}>Euro</option>
                            <option value={CurrenciesEnum.JPY}>JPY</option>
                        </select>
                    </div>
                    <div className={styles.selectContainer}>
                        <label>To</label>
                        <select name="to" ref={register}>
                            <option value={CurrenciesEnum.USD}>US Dollar</option>
                            <option value={CurrenciesEnum.EUR}>Euro</option>
                            <option value={CurrenciesEnum.JPY}>JPY</option>
                        </select>
                        {errors?.to && <p>{errors.to?.message}</p>}
                    </div>
                    <button className={styles.submitBtn}><FontAwesomeIcon icon={faChevronRight} /></button>
                </form>
                {props.children}
            </div>
        </Context.Provider>
    );
}

export default ConverterForm;