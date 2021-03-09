import { FunctionComponent } from 'react';
import { useConversionData } from '../ConverterForm/ConverterForm'
import styles from './ConversionDisplay.module.scss'
import { ConversionContextStateInterface } from '../../../shared/interfaces';

const ConversionDisplay: FunctionComponent<{}>  = () => {
    const conversionData: ConversionContextStateInterface = useConversionData();
    if (conversionData.status === 'ERROR') {
      return <div className={styles.container}>Unable to load conversion data</div>;
    }
    const { amount, converted, from, to, conversion } = conversionData.value;
    return (
      <>
      { conversion &&
          <div className={styles.container}>
            <h1>Conversion:</h1>
            <p>{amount} {from} =</p>
            <p>{converted.toFixed(4)} {to}</p>
            <p>1 {from} = {conversion.toFixed(5)} {to}</p>
          </div>

      }
      </>
    )
}

export default ConversionDisplay;