import React from 'react';

import { SubsectionHeader } from '../../common';
import TimeCheckForm from '../TimeCheckForm/TimeCheckForm';

import classNames from 'classnames/bind';
import styles from './TimeSelection.scss';

const cx = classNames.bind(styles);

const TimeSelection = ({ interviewData, onCheckedChange, checkedFields, teamsByDate }) => {
  const buildTeamsByDateString = (index) => {
    const teams = teamsByDate[index].teams;
    return teams.map(team => `${team.departmentName}${team.name === '공통' ? '' : '-' + team.name}`).join(', ');
  }
  const departmentNotices = [
    (<span><strong>토요일</strong> - {buildTeamsByDateString(0)}</span>),
    (<span><strong>일요일</strong> - {buildTeamsByDateString(1)}</span>)
  ];

  return (
    <div className={cx('time-selection-form')}>
      <SubsectionHeader title={<>가능한 인터뷰 시간대를 모두 선택해주세요. (<strong>최소 2개 선택</strong> - 연결된 시간으로 부탁드립니다.)</>} />
      <div className={cx('department-notice')}>
          {departmentNotices.map((notice, index) => (
            <li key={`Notice__${index}`}>{notice}</li>
          ))}
      </div>
      <hr />
      {interviewData.interviewDates.map((elem, index) => (
        <TimeCheckForm 
          key={index} 
          checkedFields={checkedFields} 
          onCheckedChange={onCheckedChange} 
          elem={elem} 
          index={index} 
        />
      ))}
      <hr />
    </div>
  )
}

export default TimeSelection
