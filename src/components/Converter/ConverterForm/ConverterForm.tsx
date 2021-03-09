import React, { FunctionComponent, useState, createContext, useContext } from 'react';
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


type ContextState = 
{ status: 'ERROR'; message: string }
| { status: 'LOADED'; value: ConvertCurrencyInterface };

const Context = createContext<ContextState | null>(null);

export const useItemData = (): ContextState => {
  const contextState = useContext(Context);
  if (contextState === null) {
    throw new Error('useItemData must be used within a ConverterForm tag');
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
    const { register, handleSubmit, errors } = useForm({
        resolver: zodResolver(schema),
    });
    const [state, setState] = useState<ContextState>({ 
        status: 'LOADED',
        value: {
            from: CurrenciesEnum.EUR,
            to: CurrenciesEnum.USD,
            amount: 0,
            date: new Date(),
            converted: 0
        }
    });
    const onSubmit = async ({ from, to, amount }: ConvertCurrencyInterface) => {
        try {
            const response = await ApiRequests.convertCurrency({ from, to, amount });
            setState({
                status: 'LOADED',
                value: response
              });
        } catch (error) {
            setState({ status: 'ERROR', message: error });
        }
    }

    return (
        <Context.Provider value={state}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <label>Amount</label>
                    <input name="amount" ref={register({ valueAsNumber: true })} defaultValue='0'/>
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
        </Context.Provider>
    );
}

export default ConverterForm;