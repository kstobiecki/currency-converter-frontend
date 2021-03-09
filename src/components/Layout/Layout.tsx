import React, { FunctionComponent } from 'react';
import styles from './Layout.module.scss'
import PropTypes from 'prop-types';

const Layout: FunctionComponent<{ children: React.ReactNode }> = (props: {
    children: React.ReactNode
  })=> (
  <div className={styles.container}>
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;