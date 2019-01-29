import React from 'react';

import TeamCard from '../TeamCard';

import classNames from 'classnames/bind';
import styles from './NGOBusinessChoice.scss';

const cx = classNames.bind(styles);

const NGOBusinessChoice = (props) => {
  const { } = props;

  return (
    <>
      <div className={cx('team-card-holder')}>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
      </div>
    </>
  );
}

export default NGOBusinessChoice;
