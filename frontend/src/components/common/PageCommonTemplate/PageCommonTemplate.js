import React from 'react';

import Header from '../Header';
import HeaderInformationText from '../HeaderInformationText';
import StepSection from '../StepSection';
import Footer from '../Footer';

import message from '../../../common/message'

import classNames from 'classnames/bind';
import styles from './PageCommonTemplate.scss';

const cx = classNames.bind(styles);

const PageCommonTemplate = (props) => {
  const { children, config } = props;
  const { showHeaderInformation, showStepSection } = config;

  return (
    <div>
      <Header {...props}/>
        { showStepSection && <StepSection className={cx('container')}/> }
        <main className={cx('container')}>
          {children}
        </main>
      <Footer/>
    </div>
  );
};

export default PageCommonTemplate;
