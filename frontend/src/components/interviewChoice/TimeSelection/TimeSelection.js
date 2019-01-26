import React from 'react';

import classNames from 'classnames/bind';
import styles from './TimeSelection.scss';
import SubsectionHeader from '../../common/SubsectionHeader';
import TimeCheckForm from '../TimeCheckForm/TimeCheckForm';

const cx = classNames.bind(styles);

const TimeSelection = ({ onCheckedChange, checkedFields }) => {

  const departmentNotices = [
    (<span><strong>토요일</strong> - 디자인본부, IT기획본부, 해외의료사업본부</span>),
    (<span><strong>일요일</strong> - 경영지원본부, 브랜드마케팅본부, 무료진료소사업본부, 보건교육사업본부</span>)
  ];

  const interviewDates = [
    {
      day: '09. 01. 토',
      times: [
        '14:00 ~ 15:00', 
        '15:00 ~ 16:00', 
        '16:00 ~ 17:00', 
        '17:00 ~ 18:00'
      ]
    },
    {
      day: '09. 02. 일', 
      times: [
        '10:00 ~ 11:00', 
        '11:00 ~ 12:00', 
        '12:00 ~ 13:00', 
        '13:00 ~ 14:00',
        '14:00 ~ 15:00',
        '15:00 ~ 16:00',
        '16:00 ~ 17:00'
      ]
    }
  ]
  return (
    <div className={cx('time-selection-form')}>
      <SubsectionHeader title={<>가능한 인터뷰 시간대를 모두 선택해주세요. (<strong>최소 2개 선택</strong> - 연결된 시간으로 부탁드립니다.)</>} />
      <div className={cx('department-notice')}>
          {departmentNotices.map((notice, index) => (
            <li key={`Notice__${index}`}>{notice}</li>
          ))}
      </div>
      <hr />
      {interviewDates.map((interviewDate, index) => (
        <TimeCheckForm 
          key={index} 
          checkedFields={checkedFields} 
          onCheckedChange={onCheckedChange} 
          date={interviewDate} 
          index={index} 
        />
      ))}
      <hr />
    </div>
  )
}

export default TimeSelection