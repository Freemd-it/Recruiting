import React from 'react';

import {
  withStyles,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';


import { SubsectionHeader } from '../../common';

import classNames from 'classnames/bind';
import styles from './OtherAssignConsent.scss';

const cx = classNames.bind(styles);

const OtherAssignConsent = (props) => {
  return (
    <div className={cx('other-assign-consent-container')}>
      <SubsectionHeader title="아래 사항들은 리쿠르팅 결과와 전혀 상관이 없습니다." noDivider={true}/>

      <div>

      </div>
    </div>
  );
}

export default OtherAssignConsent;
