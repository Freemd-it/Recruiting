import React from 'react';

import Header from '../Header';
import StepSection from '../StepSection';
import NextSection from '../NextSection';
import Footer from '../Footer';

import classNames from 'classnames/bind';
import styles from './PageCommonTemplate.scss';

const cx = classNames.bind(styles);

const PageCommonTemplate = (props) => {
  const { children, config } = props;
  const { showHeaderInformation, showStepSection, showNextSection } = config;

  return (
    <div>
      <Header {...props}/>
        { showStepSection && <StepSection/> }
        <main className={cx('container')}>
          {children}
        </main>
        { <NextSection showNextSection={showNextSection}/> }
      <Footer/>
    </div>
  );
};

export default PageCommonTemplate;
