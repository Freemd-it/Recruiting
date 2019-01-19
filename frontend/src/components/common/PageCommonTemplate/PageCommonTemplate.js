import React from 'react';

import Header from '../Header';
import HeaderInformationText from '../HeaderInformationText';
import Footer from '../Footer';

import message from '../../../common/message'

import classNames from 'classnames/bind';
import styles from './PageCommonTemplate.scss';

const cx = classNames.bind(styles);

const PageCommonTemplate = (props) => {
  const { children, config } = props;
  const { showHeaderInformation } = config;

  return (
    <div>
      <Header/>
        {showHeaderInformation && <HeaderInformationText messageConfig={message[config.pageType]}/>}
      <main className={cx('container')}>
        {children}
      </main>
      <Footer className={cx('container')}/>
    </div>
  );
};

export default PageCommonTemplate;
