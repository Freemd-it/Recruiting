import React from 'react';

import classNames from 'classnames/bind';
import styles from './SubsectionHeader.scss';

const cx = classNames.bind(styles);

const SubsectionHeader = ({title, noDivider=false}) => {
  return (
    <>
      <div className={cx('subsection-title')}>
        <span>{title}</span>
      </div>
      {noDivider ? null : <hr className={cx('subsection-title-underline')}/>}
    </>
  )
};

export default SubsectionHeader;
