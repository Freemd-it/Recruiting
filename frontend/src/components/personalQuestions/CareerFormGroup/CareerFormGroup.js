import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

import FieldGroup from '../../common/Form/FieldGroup';
import FieldGroupWithLabelInlineAndChildren from '../../common/Form/FieldGroupWithLabelInlineAndChildren';

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './CareerFormGroup.scss';

const cx = classNames.bind({...stylesCommon, ...styles});

class CareerFormGroup extends Component {
  render() {
    const { personalFields, formGroupIndex, onInputChange } = this.props;
    const { activityType, activityDetail, durationStart, durationEnd, content } = personalFields.career.detail[formGroupIndex];

    return (
      <>
        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-career-division'
            label='활동구분'
          >
            <div className={cx('personal-form-holder')}>
              <FormControl
                componentClass='select'
                bsClass='form-control career-division-item-1 custorm-form'
                value={activityType}
                onChange={onInputChange(`career.detail.${formGroupIndex}.activityType.`, false)}
              >
                <option value='인턴'> 인턴 </option>
              </FormControl>
              <FieldGroup
                id='personalInformationForm-career-division-text'
                type='text'
                placeholder="회사/기관/단체명"
                bsClass='form-control career-division-item-2 placeholder-right custom-form'
                value={activityDetail}
                onChange={onInputChange(`career.detail.${formGroupIndex}.activityDetail`, false)}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-career-duration'
            label='활동기간'
          >
            <div className={cx('personal-form-holder')}>
              <FieldGroup
                type='text'
                placeholder='YYYY/MM'
                bsClass='form-control career-duration-text custom-form'
                value={durationStart}
                onChange={onInputChange(`career.detail.${formGroupIndex}.durationStart`, false)}
              />
              -
              <FieldGroup
                type='text'
                placeholder='YYYY/MM'
                bsClass='form-control career-duration-text graduation-date custom-form'
                value={durationEnd}
                onChange={onInputChange(`career.detail.${formGroupIndex}.durationEnd`, false)}
              />
              <FieldGroup
                type='text'
                placeholder="시간"
                bsClass='form-control career-duration-time placeholder-right custom-form'
                onChange={onInputChange(`career.detail.${formGroupIndex}.time`, false)}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>


        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            label='활동내역'
            full={true}
          >
            <div className={cx('personal-full-form-holder')}>
              <FormControl
                componentClass='textarea'
                bsClass='form-control custorm-form'
                value={content}
                onChange={onInputChange(`career.detail.${formGroupIndex}.content`, false)}
              >
              </FormControl>
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>
      </>
    );
  }
};

export default CareerFormGroup;



