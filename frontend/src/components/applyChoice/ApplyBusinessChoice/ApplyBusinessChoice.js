import React from 'react';

import { SubsectionHeader } from '../../common';
import ApplyChoiceTitle from '../ApplyChoiceTitle';
import NGOBusinessChoice from '../NGOBusinessChoice';
import MedicalBusinessChoice from '../MedicalBusinessChoice';

import plusImage from '../../../images/plus.png';
import minusImage from '../../../images/minus.png';
import errorImage from '../../../images/error.png';

import classNames from 'classnames/bind';
import styles from './ApplyBusinessChoice.scss';

const cx = classNames.bind(styles);

const ApplyBusinessChoice = (props) => {
  const { isSecondApply, isSecondApplyChoice, onClickSecondApply, onShowModal } = props;

  return (
    <>
      <div className={cx('apply-business-choice-title')}>
        <ApplyChoiceTitle {...props}/>
        { isSecondApply && <img src={isSecondApplyChoice ? minusImage : plusImage} alt="" onClick={onClickSecondApply}/> }
      </div>

      { isSecondApply && !isSecondApplyChoice && <hr className={cx('subsection-title-underline')}/> }

      {
        (!isSecondApply || (isSecondApply && isSecondApplyChoice )) && (
          <div className={cx('apply-business-choice-container')}>
            <div className={cx('ngo-business-form')}>
              <SubsectionHeader title="NGO 운영"/>
              <NGOBusinessChoice {...props}/>
            </div>
            <div className={cx('medical-business-form')}>
              <div className={cx('mediacal-title-form')}>
                <div className={cx('subsection-title')}>
                  <span>의료 사업</span>
                </div>
                <img src={errorImage} alt="" onClick={onShowModal}/>
              </div>
              <hr className={cx('subsection-title-underline')}/>
              <MedicalBusinessChoice {...props}/>
            </div>
          </div>
        )
      }
    </>
  );
}

export default ApplyBusinessChoice;
