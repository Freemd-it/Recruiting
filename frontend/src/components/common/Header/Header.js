import React from 'react';

import classNames from 'classnames/bind';
import styles from './Header.scss';

import headerImage from '../../../images/header_image.png';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <>
      <div className={cx('header-background', 'container-fluid')}>
      </div>
      <header className={cx('header', 'container')}>
        <div className={cx('header-text-holder')}>
          <div className={cx('header-text-title')}>RECRUIT</div>
          <span className={cx('header-text')}>제 20기 프리메드 신입 단원 모집</span>
        </div>
        <img src={headerImage} className={cx('header-image')}/>
      </header>
    </>
  );
};

export default Header;
