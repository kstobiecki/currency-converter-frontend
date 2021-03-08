import { FunctionComponent } from 'react';
import styles from './Converter.module.scss'
import ConverterForm from './ConverterForm/ConverterForm'
import ConversionDisplay from './ConversionDisplay/ConversionDisplay'
import ConversionHistory from './ConversionHistory/ConversionHistory';

const Converter: FunctionComponent<{}>  = () => {
    return (
        <div className={styles.container}>
            <ConverterForm>
                <ConversionDisplay/>
                <ConversionHistory/>
            </ConverterForm>
        </div>
    );
}

export default Converter;