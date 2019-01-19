import React from 'react';

import classNames from 'classnames/bind';
import styles from './HeaderInformationText.scss';

const cx = classNames.bind(styles);

const HeaderInformationText = (props) => {
  console.log(props);


  return (
    <div className={cx('header-information-text')}>

    </div>
  );
};

export default HeaderInformationText;
