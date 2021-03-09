import { FunctionComponent } from 'react';
import styles from './ConversionHistory.module.scss'
import { useConversionData } from '../ConverterForm/ConverterForm'
import { ConversionContextStateInterface, ConvertCurrencyInterface } from '../../../shared/interfaces';

const ConversionHistory: FunctionComponent<{}>  = () => {
    const conversionData: ConversionContextStateInterface = useConversionData();
    return (
        <div className={styles.container}>
        <h1>History:</h1>
            {
                conversionData.history.map((conversionItem: ConvertCurrencyInterface, index: number) => 
                    <div key={index}>
                        <p>{new Date(conversionItem.date).toLocaleString()}</p>
                        <p>{conversionItem.amount} {conversionItem.from} = {conversionItem.converted?.toFixed(5)} {conversionItem.to}</p>
                    </div>
                )
            }
        </div>
    )
}

export default ConversionHistory;