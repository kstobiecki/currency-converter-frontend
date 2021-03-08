import { FunctionComponent } from 'react';
import styles from './Layout.module.scss'
import PropTypes from 'prop-types';

const Layout: FunctionComponent<{}> = ({
    children
  })=> (
  <div className={styles.container}>
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;