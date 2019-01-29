import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

import {
  SubsectionHeader,
  FieldGroup,
  FieldGroupWithLabelInline,
  FieldGroupWithLabelInlineAndChildren
} from '../../common';

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './Education.scss';

const cx = classNames.bind({...stylesCommon, ...styles});

class Education extends Component {
  render() {
    const { personalFields, onInputChange } = this.props;
    const { schoolName, major, location, graduationYear } = personalFields.education;

    return (
      <div className={cx('personal-form')}>
        <SubsectionHeader title='최종학력' />

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-email'
            label='학교명'
          >
            <div className={cx('personal-form-holder')}>
              <FieldGroup
                id='personalInformationForm-education-schoolName'
                type='text'
                bsClass='form-control school-name custom-form'
                value={schoolName.text}
                onChange={onInputChange('education.schoolName.text', true)}
              />
              <FormControl
                componentClass='select'
                bsClass='form-control school-type custorm-form'
                value={schoolName.type || "대학교"}
                onChange={onInputChange('education.schoolName.type', true)}
              >
                <option value='중학교'> 중학교 </option>
                <option value='고등학교'> 고등학교 </option>
                <option value='대학교'> 대학교 </option>
              </FormControl>
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInline
            id='personalInformationForm-major'
            type='text'
            label='계열'
            bsClass='form-control personal-text-custom-form custom-form'
            value={major}
            onChange={onInputChange('education.major', false)}
          />
        </div>

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInline
            id='personalInformationForm-location'
            type='text'
            label='소재지'
            bsClass='form-control personal-text-custom-form custom-form'
            value={location}
            onChange={onInputChange('education.location', false)}
          />

          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-entrance-graduation'
            label='입학/졸업 년월'
          >
            <div className={cx('personal-form-holder')}>
              <FieldGroup
                id='personalInformationForm-entrance-date'
                type='text'
                placeholder='YYYY/MM'
                bsClass='form-control entrance-date custom-form'
                value={graduationYear.entrance}
                onChange={onInputChange('education.graduationYear.entrance', false)}
              />
              -
              <FieldGroup
                id='personalInformationForm-graduation-date'
                type='text'
                placeholder='YYYY/MM'
                bsClass='form-control graduation-date custom-form'
                value={graduationYear.graduation}
                onChange={onInputChange('education.graduationYear.graduation', false)}
              />
              <FormControl
                componentClass='select'
                bsClass='form-control graduation-status custorm-form'
                value={graduationYear.status || "졸업"}
                onChange={onInputChange('education.graduationYear.status', false)}
              >
                <option value='졸업'> 졸업 </option>
                <option value='재학'> 재학 </option>
              </FormControl>
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>

      </div>
    );
  }
};

export default Education;



