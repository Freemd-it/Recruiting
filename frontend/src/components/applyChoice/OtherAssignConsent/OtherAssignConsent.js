import React from 'react';

import SubsectionHeader from '../../common/SubsectionHeader';

import classNames from 'classnames/bind';
import styles from './OtherAssignConsent.scss';

const cx = classNames.bind(styles);

const OtherAssignConsent = (props) => {
  return (
    <div className={cx('other-assign-consent-container')}>
      <SubsectionHeader title="아래 사항들은 리쿠르팅 결과와 전혀 상관이 없습니다."/>
    </div>
  );
}

export default OtherAssignConsent;
