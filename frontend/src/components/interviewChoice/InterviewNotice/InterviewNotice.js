import React from 'react';

import classNames from 'classnames/bind';
import styles from './InterviewNotice.scss';
import SubsectionHeader from '../../common/SubsectionHeader';

const cx = classNames.bind(styles);

const InterviewNotice = () => {
  const contents = [
    (<span>인터뷰 시간은 <strong>1시간 30분에서 2시간 정도</strong> 소요됩니다.
     (대기시간 포함)</span>),
    (<span>- 인터뷰 대상자 발표는 <strong>2018년 08월 31일(금) 오후</strong>
      에 홈페이지와 개별 연락으로 진행되며, 인터뷰는 <strong>2018년 09월 01(토) - 02(일)</strong>양일 간 진행됩니다.</span>),
    (<span>- 2018년 08월 31일(금) 인터뷰 대상자 <strong>발표 이후에는 희망 시간대 변경이 어려우니,</strong></span>),
    (<span>- 변경을 원하시는 경우 발표 이전에 본 단체 제 19기 리크루팅 공식 계정으로 변경 신청 메일을 보내주시기 바랍니다.</span>),
    (<span>- 본 단체에서는 인터뷰 대상자 분들의 시간젹 편의를 최대한 고려하겠습니다만,</span>),
    (<span>- 불가피한 경우 원하시는 시간대에 인터뷰 시간이 배정되지 못할 수도 있음을 너그러이 양해 부탁 드립니다.</span>),
    (<span>- 기타 일정 및 수습 단원 선발 이후의 일정은 본 단체 홈페이지 상 공고의 첨부파일 (프리메드 제 19기 신입
      단원 공개 선발 안내) 을 참조해주십시오.
      </span>)
  ];
  return (
    <div className={cx('interview-notice-form')}>
      <SubsectionHeader title='인터뷰 사전 공지' />
      {contents.map((content, index) => (
        <li key={`Content__${index}`} className={cx(index === 0 ? 'intro-line' : null)}>{content}</li>
      ))}
    </div>
  )
};

export default InterviewNotice;