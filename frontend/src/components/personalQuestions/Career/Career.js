import React, { Component } from 'react';

import CareerFormGroup from '../CareerFormGroup';

import plusImage from '../../../images/plus.png'

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './Career.scss';

const cx = classNames.bind({...stylesCommon, ...styles});

class Career extends Component {
  render() {
    const { personalFields, onPlusFormGroup } = this.props;
    const { detail } = personalFields.career;

    return (
      <div className={cx('personal-form')}>
        <div className={cx('subsection-title')}>
          <span>경력</span>
          <img src={plusImage} onClick={() => onPlusFormGroup('career')}/>
        </div>

        <hr/>

        {detail.map((formGroupRow, formGroupIndex) => (
          <div key={`FormGroup__${formGroupIndex}`}>
            <CareerFormGroup formGroupIndex={formGroupIndex} {...this.props}/>
            {(detail.length >= 2 && formGroupIndex != detail.length - 1) && <hr className={cx('form-group-divider')}/>}
          </div>
        ))}

      </div>
    );
  }
};

export default Career;



