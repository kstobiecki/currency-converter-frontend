import React, { FunctionComponent, useState, createContext, useContext, useEffect } from 'react';
import styles from './ConverterForm.module.scss'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import * as ApiRequests from '../../../api/ApiRequests';
import { ConvertCurrencyInterface, ConversionContextStateInterface } from '../../../shared/interfaces';
import { CurrenciesEnum } from '../../../shared/enums'
import { ZodRawShape } from 'zod/lib/src/types/base';

enum LimitsEnum {
    MAX_HISTORY_ELEMENTS = 10
}

const Context = createContext<ConversionContextStateInterface | null>(null);

export const useConversionData = (): ConversionContextStateInterface => {
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

const ConverterForm: FunctionComponent<{ children: React.ReactNode }> = (props: { 
        children: React.ReactNode 
    }) => {
    const initialValue = {
        from: CurrenciesEnum.EUR,
        to: CurrenciesEnum.USD,
        amount: 1
    } as ConvertCurrencyInterface;
    const { register, handleSubmit, errors } = useForm({
        resolver: zodResolver(schema),
    });
    const [inputAmount, setAmount] = useState('');
    const [state, setState] = useState<ConversionContextStateInterface>({ 
        status: 'LOADED',
        value: initialValue,
        history: []
    });
    const convertCurrency = async ({ from, to, amount }: ConvertCurrencyInterface) => {
        try {
            const fixedAmount = amount.toFixed(2);
            setAmount(fixedAmount);
            
            const response: { data: ConvertCurrencyInterface } = await ApiRequests.convertCurrency({ from, to, amount: Number.parseFloat(fixedAmount) });

            setState({
                status: 'LOADED',
                value: response.data,
                history: [...state.history.slice(1 - LimitsEnum.MAX_HISTORY_ELEMENTS), response.data]
            });
        } catch (error) {
            setState({ ...state, status: 'ERROR' });
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