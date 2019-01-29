import React from 'react';

import SubsectionHeader from '../../common/SubsectionHeader';
import TeamCard from '../TeamCard';

import classNames from 'classnames/bind';
import styles from './ApplyBusinessChoice.scss';

const cx = classNames.bind(styles);

const ApplyBusinessChoice = ({ }) => {

  return (
    <div className={cx('apply-business-choice-container')}>
      <SubsectionHeader title="NGO 사업"/>


      <div className={cx('team-card-holder')}>
        <TeamCard
          />
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>
        <TeamCard></TeamCard>
      </div>

    </div>
  );
}

export default ApplyBusinessChoice;
