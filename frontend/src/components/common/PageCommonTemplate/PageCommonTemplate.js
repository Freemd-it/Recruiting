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
  const { showStepSection, showNextSection, pageType } = config;

  return (
    <div>
      <Header {...props}/>
        { showStepSection && <StepSection/> }
        <main className={cx('container')}>
          {children}
        </main>
        { showNextSection && <NextSection pageType={pageType}/> }
      <Footer/>
    </div>
  );
};

export default PageCommonTemplate;
