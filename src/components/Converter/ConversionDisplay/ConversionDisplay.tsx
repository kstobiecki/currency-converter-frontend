import { FunctionComponent } from 'react';
import { useItemData } from '../ConverterForm/ConverterForm'
import styles from './ConversionDisplay.module.scss'

const ConversionDisplay: FunctionComponent<{}>  = () => {
    const data = useItemData();

    if (data.status === 'ERROR') {
      return <div>Unable to load item data: {data.message}</div>;
    }
    return <div>Hello {data.value.amount}</div>;
}

export default ConversionDisplay;