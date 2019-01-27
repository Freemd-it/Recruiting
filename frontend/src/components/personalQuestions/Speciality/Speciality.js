import React, { Component } from 'react';

import SubsectionHeader from '../../common/SubsectionHeader';
import SpecialityFormGroup from '../SpecialityFormGroup';

import classNames from 'classnames/bind';
import styles from './Speciality.scss';

const cx = classNames.bind(styles);

class Speciality extends Component {
  render() {
    const { personalFields } = this.props;
    const { detail } = personalFields.speciality;

    return (
      <div className={cx('personal-form')}>
        <SubsectionHeader title='특기사항' />

        {detail.map((formGroupRow, formGroupIndex) => (
          <div key={`FormGroup__${formGroupIndex}`}>
            <SpecialityFormGroup formGroupIndex={formGroupIndex} {...this.props}/>
            {(detail.length >= 2 && formGroupIndex != detail.length - 1) && <hr className={cx('form-group-divider')}/>}
          </div>
        ))}


      </div>
    );
  }
};

export default Speciality;



