import React from 'react';

import classNames from 'classnames/bind';
import styles from './PageTemplate.scss';

import Header from '../Header';
import Footer from '../Footer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => {
  return (
    <div>
      <Header/>
      <main className={cx('container')}>
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default PageTemplate;
