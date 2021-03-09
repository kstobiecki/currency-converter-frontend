import { FunctionComponent } from 'react';
import styles from './Converter.module.scss'
import ConverterForm from './ConverterForm/ConverterForm'
import ConversionDisplay from './ConversionDisplay/ConversionDisplay'
import ConversionHistory from './ConversionHistory/ConversionHistory';

const Converter: FunctionComponent<{}>  = () => {
    return (
        <div className={styles.container}>
            <ConverterForm>
                <div className={styles.displayContainer}>
                    <ConversionDisplay/>
                    <ConversionHistory/>
                </div>
            </ConverterForm>
        </div>
    );
}

export default Converter;