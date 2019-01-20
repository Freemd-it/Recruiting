import React from 'react';
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './StepSection.scss';

const cx = classNames.bind(styles);

const StepSection = (props) => {

  return (
    <div className={cx('step-item-holder', 'container')}>
      <ul>
        <NavLink to='/personalQuestions' className={cx('step-item')} activeClassName="selected">STEP 1</NavLink>
        <NavLink to='/applyChoice' className={cx('step-item')} activeClassName="selected">STEP 2</NavLink>
        <NavLink to='/applyQuestions' className={cx('step-item')} activeClassName="selected">STEP 3</NavLink>
        <NavLink to='/interviewChoice' className={cx('step-item')} activeClassName="selected">STEP 4</NavLink>
      </ul>
    </div>
  )
};

export default StepSection;
