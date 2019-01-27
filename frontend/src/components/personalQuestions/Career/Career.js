import React, { Component } from 'react';

import SubsectionHeader from '../../common/SubsectionHeader';
import CareerFormGroup from '../CareerFormGroup';

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './Career.scss';

const cx = classNames.bind({...stylesCommon, ...styles});

class Career extends Component {
  render() {
    const { personalFields } = this.props;
    const { detail } = personalFields.career;

    return (
      <div className={cx('personal-form')}>
        <SubsectionHeader title='경력' />

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



