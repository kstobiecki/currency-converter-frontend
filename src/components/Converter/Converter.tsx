import { FunctionComponent } from 'react';
import styles from './Converter.module.scss'
import ConverterForm from './ConverterForm/ConverterForm'

const Converter: FunctionComponent<{}>  = () => {
    return (
        <div className={styles.container}>
            <ConverterForm/>
        </div>
    );
}

export default Converter;