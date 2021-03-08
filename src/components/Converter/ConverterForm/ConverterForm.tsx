import { FunctionComponent } from 'react';
import styles from './ConverterForm.module.scss'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const onSubmit = (data: any) => {
    // console.log(data);
}

const schema = z.object({
    amountInput: z.number(),
    toValue: z.string(),
    fromValue: z.string(),
  })
  .refine((data: any) => data.fromValue !== data.toValue, {
      message: 'Please choose different currency',
      path: ['toValue']
  })

const ConverterForm: FunctionComponent<{}>  = () => {
    const { register, handleSubmit, watch, errors } = useForm({
        resolver: zodResolver(schema),
    });
    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    <label>Amount</label>
                    <input name="amountInput" ref={register({ valueAsNumber: true })} defaultValue='0'/>
                    {errors.amountInput && <p>Please enter a valid amount</p>}
                </div>
                <div className={styles.selectContainer}>
                    <label>From</label>
                    <select name="fromValue" ref={register} defaultValue='EUR'>
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="Yen">Yen</option>
                    </select>
                </div>
                <div className={styles.selectContainer}>
                    <label>To</label>
                    <select name="toValue" ref={register}>
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="Yen">Yen</option>
                    </select>
                    {errors?.toValue && <p>{errors.toValue?.message}</p>}
                </div>
                <button className={styles.submitBtn}><FontAwesomeIcon icon={faChevronRight} /></button>
            </form>
    );
}

export default ConverterForm;