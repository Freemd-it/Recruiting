import React from 'react';
import moment from 'moment';
import { Button } from '@material-ui/core';

import classNames from 'classnames/bind';
import styles from './ResumeComplete.scss';

const cx = classNames.bind(styles);

const ResumeComplete = (props) => {
  const { batch, announceDate } = props;
  const announceString = moment(announceDate)
    .format("YYYY년 MM월 DD일 오후 6시");
  return (
    <div className={cx('resume-complete-form')}>
      <div>
        {`비영리민간의료단체 프리메드 제 ${batch}기 신입 단원 공개 선발에 `}<span>지원해주셔서 대단히 감사합니다.</span>
      </div>
      <div>
        지원해주신 결과는 <span><strong> 개별 문자 </strong></span>와
        <span><strong> 홈페이지 공고 </strong></span>를 통해 
        <strong> {announceString}에 발표</strong>됩니다.
      </div>

      <Button 
        className={cx('survey-link')} 
        href="https://forms.gle/y9Lb4rd5rwyt4Eq36"
      >
        <span>설문조사</span>
        <span>></span>
      </Button>

      <div className={cx('survey-description')}>
        {`설문은 ${batch}기 지원자분들의 단체 인지 경로를 알아보고자 함이며,`} 후에 리크루팅 홍보 및 단체 운영 시 참고하기 위하여 진행합니다.
      </div>
      <div>
        지원자 분들의 성실한 답변 부탁드리겠습니다. 
      </div>
      <div>
        <span><strong>감사합니다</strong></span>
      </div>
    </div>
  );
}

export default ResumeComplete;
