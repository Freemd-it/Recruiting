import React from 'react';

import HeaderInformationText from '../HeaderInformationText';
import message from '../../../common/message'

import classNames from 'classnames/bind';
import styles from './Header.scss';

import headerImage from '../../../images/header_image.png';

const cx = classNames.bind(styles);

const Header = (props) => {
  const { config } = props;
  const { showHeaderInformation } = config;

  return (
    <>
      <div className={cx('header-background', 'container-fluid')}>
      </div>
      <header className={cx('header', 'container')}>
        <div className={cx('header-text-holder')}>
          <div className={cx('header-text-title')}>RECRUIT</div>
          <span className={cx('header-text')}>제 20기 프리메드 신입 단원 모집</span>
        </div>
        <img src={headerImage} className={cx('header-image')} alt=""/>
        { showHeaderInformation && <HeaderInformationText messageConfig={message[config.pageType]}/> }
      </header>
    </>
  );
};

export default Header;
