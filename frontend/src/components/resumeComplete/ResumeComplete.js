import React from 'react';

import classNames from 'classnames/bind';
import styles from './ResumeComplete.scss';
import { Button } from '@material-ui/core';

const cx = classNames.bind(styles);

const ResumeComplete = () => {

  return (
    <div className={cx('resume-complete-form')}>
      <div>
        비영리민간의료단체 프리메드 제 20기 신입 단원 공개 선발에 <span>지원해주셔서 대단히 감사합니다.</span>
      </div>
      <div>
        지원해주신 결과는 <span><strong> 개인 문자 </strong></span>와 
        <span><strong> 홈페이지 공고 </strong></span>를 통해 
        <strong> 3월 00일에 발표</strong>됩니다.
      </div>

      <Button className={cx('survey-link')} href="http://www.google.com">
        <span>설문조사</span>
        <span>></span>
      </Button>
    </div>
  );
}

export default ResumeComplete;