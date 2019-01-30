import React, { Component } from 'react';

import SpecialityFormGroup from '../SpecialityFormGroup';

import plusImage from '../../../images/plus.png'

import classNames from 'classnames/bind';
import styles from './Speciality.scss';

const cx = classNames.bind(styles);

class Speciality extends Component {
  render() {
    const { personalFields, onPlusFormGroup } = this.props;
    const { detail } = personalFields.speciality;

    return (
      <div className={cx('personal-form')}>
        <div className={cx('subsection-title')}>
          <span>특기사항</span>
          <img src={plusImage} onClick={() => onPlusFormGroup('speciality')} alt=""/>
        </div>

        <hr className={cx('subsection-title-underline')}/>

        {detail.map((formGroupRow, formGroupIndex) => (
          <div key={`FormGroup__${formGroupIndex}`}>
            <SpecialityFormGroup formGroupIndex={formGroupIndex} {...this.props}/>
            {(detail.length >= 2 && formGroupIndex !== detail.length - 1) && <hr className={cx('form-group-divider')}/>}
          </div>
        ))}


      </div>
    );
  }
};

export default Speciality;



