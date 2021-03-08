import { FunctionComponent } from 'react';
import { useItemData } from '../ConverterForm/ConverterForm'
import styles from './ConversionDisplay.module.scss'

const ConversionDisplay: FunctionComponent<{}>  = () => {
    const data = useItemData();

    if (data.status === 'LOADING') {
      return <div>data is loading</div>;
    } else if (data.status === 'ERROR') {
      return <div>Unable to load item data</div>;
    }

    return <div>Hello {data.value.count}</div>;
}

export default ConversionDisplay;