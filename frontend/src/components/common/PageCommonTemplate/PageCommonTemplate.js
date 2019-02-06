import React from 'react';

import Header from '../Header';
import StepSection from '../StepSection';
import NextSection from '../NextSection';
import Footer from '../Footer';

import classNames from 'classnames/bind';
import styles from './PageCommonTemplate.scss';

const cx = classNames.bind(styles);

const PageCommonTemplate = (props) => {
  const { children, config, onSaveStoreDataByUser } = props;
  const { showStepSection, showNextSection, showTemporarySaveButton } = config;

  return (
    <div>
      <Header {...props}/>
        { showStepSection && <StepSection/> }
        <main className={cx('container')}>
          {children}
          { showTemporarySaveButton && <div className={cx('save-button')}><button onClick={onSaveStoreDataByUser}>임시저장</button></div>}
        </main>
        { showNextSection && <NextSection config={config} {...props}/> }

      <Footer/>
    </div>
  );
};

export default PageCommonTemplate;
