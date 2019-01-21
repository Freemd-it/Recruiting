import React from 'react';

import classNames from 'classnames/bind';
import styles from './SectionTitle.scss';

const cx = classNames.bind(styles);

const SectionTitle = ({title}) => {
  return (
    <>
      <div className={cx('title')}>
        {title}
      </div>
    </>
  );
};

export default SectionTitle;