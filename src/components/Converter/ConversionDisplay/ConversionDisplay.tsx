import { FunctionComponent } from 'react';
import { useConversionData } from '../ConverterForm/ConverterForm'
import styles from './ConversionDisplay.module.scss'
import { ConversionContextState } from '../../../shared/types';

const ConversionDisplay: FunctionComponent<{}>  = () => {
    const conversionData: ConversionContextState = useConversionData();
    if (conversionData.status === 'ERROR') {
      return <div className={styles.container}>{conversionData.message}</div>;
    }
    const { amount, converted, from, to, conversion } = conversionData.value;
    return (
      <>
      { conversion &&
          <div className={styles.container}>
            <p>{amount} {from} =</p>
            <p>{converted} {to}</p>
            <p>1 {from} = {conversion} {to}</p>
          </div>

      }
      </>
    )
}

export default ConversionDisplay;