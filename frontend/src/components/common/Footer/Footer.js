import React from 'react';

import classNames from 'classnames/bind';
import styles from './Footer.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx('container', 'footer')}>
      <hr/>
    </footer>
  );
};

export default Footer;
