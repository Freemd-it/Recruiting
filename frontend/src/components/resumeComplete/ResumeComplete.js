import React from 'react';

import { Button } from '@material-ui/core';

import classNames from 'classnames/bind';
import styles from './ResumeComplete.scss';

const cx = classNames.bind(styles);

const ResumeComplete = () => {

  return (
    <div className={cx('resume-complete-form')}>
      <div>
        비영리민간의료단체 프리메드 제 20기 신입 단원 공개 선발에 <span>지원해주셔서 대단히 감사합니다.</span>
      </div>
      <div>
        지원해주신 결과는 <span><strong> 개별 문자 </strong></span>와
        <span><strong> 홈페이지 공고 </strong></span>를 통해 
        <strong> 3월 07일 오후6시에 발표</strong>됩니다.
      </div>

      <Button 
        className={cx('survey-link')} 
        href="https://docs.google.com/forms/d/e/1FAIpQLSf3iP1GTL6qbXv2cB_XuIzspMhvrpbVn1eMQ14bUpY-41si5A/viewform?c=0&w=1"
      >
        <span>설문조사</span>
        <span>></span>
      </Button>
    </div>
  );
}

export default ResumeComplete;
