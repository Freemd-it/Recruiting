import React from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';

import classNames from 'classnames/bind';
import styles from './ApplyComplete.scss';

const cx = classNames.bind(styles);

const ApplyComplete = (props) => {
  const { batch, announceDate } = props;
  const announceString = moment(announceDate)
    .format("YYYY년 MM월 DD일 오후 6시");
  return (
    <div className={cx('resume-complete-form')}>
      <div>
        {`비영리민간의료단체 프리메드 제 ${batch}기 신입 단원 공개 선발은 `}<span>마감되었습니다.</span>
      </div>
      <div>
        지원해주신 결과는 <span><strong> 개별 문자 </strong></span>와
        <span><strong> 홈페이지 공고 </strong></span>를 통해 
        <strong> {announceString}에 발표</strong>됩니다.
      </div>

      <div>
        <span><strong>감사합니다</strong></span>
      </div>
    </div>
  );
}

export default ApplyComplete;
