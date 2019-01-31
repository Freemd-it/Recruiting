import React from 'react';

import { SubsectionHeader } from '../../common';
import ApplyChoiceTitle from '../ApplyChoiceTitle';
import NGOBusinessChoice from '../NGOBusinessChoice';
import MedicalBusinessChoice from '../MedicalBusinessChoice';

import plusImage from '../../../images/plus.png'
import minusImage from '../../../images/minus.png'

import classNames from 'classnames/bind';
import styles from './ApplyBusinessChoice.scss';

const cx = classNames.bind(styles);

const ApplyBusinessChoice = (props) => {
  const { isSecondApply, isSecondApplyChoice } = props;

  return (
    <>
      <div className={cx('apply-business-choice-title')}>
        <ApplyChoiceTitle {...props}/>
        { isSecondApply && <img src={isSecondApplyChoice ? minusImage : plusImage} alt=""/> }
      </div>

      { isSecondApply && !isSecondApplyChoice && <hr className={cx('subsection-title-underline')}/> }

      {
        (!isSecondApply || (isSecondApply && isSecondApplyChoice )) && (
          <div className={cx('apply-business-choice-container')}>
            <div className={cx('ngo-business-form')}>
              <SubsectionHeader title="NGO 사업"/>
              <NGOBusinessChoice {...props}/>
            </div>
            <div className={cx('medical-business-form')}>
              <SubsectionHeader title="의료 산업"/>
              <MedicalBusinessChoice {...props}/>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ApplyBusinessChoice;
