import React from 'react';

import classNames from 'classnames/bind';
import styles from './ApplyChoiceTitle.scss';

const cx = classNames.bind(styles);

const ApplyChoiceTitle = ({ title, isSecondApply }) => {
  return (
    <>
      <div className={!isSecondApply ? cx('apply-choice-title') : cx('apply-choice-second-title')}>
        {title}
      </div>
    </>
  );
};

export default ApplyChoiceTitle;
