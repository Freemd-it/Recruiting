import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import FieldGroup from '../../common/Form/FieldGroup';
import FieldGroupWithLabelInline from '../../common/Form/FieldGroupWithLabelInline';
import FieldGroupWithLabelInlineAndChildren from '../../common/Form/FieldGroupWithLabelInlineAndChildren';

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './Education.scss';
import SubsectionHeader from '../../common/SubsectionHeader';

const cx = classNames.bind({...stylesCommon, ...styles});

const meterialStyles = theme => ({

});

class PersonalInformation extends Component {
  render() {
    const { classes, personalFields, onInputChange } = this.props;
    const {  } = personalFields;

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
                onChange={onInputChange('education.schoolName')}
              />
              <FormControl
                componentClass='select'
                bsClass='form-control school-type custorm-form'
                onChange={onInputChange('education.schoolType')}
              >
                <option value='중학교'> 중학교 </option>
                <option value='고등학교'> 고등학교 </option>
                <option value='대학교' defaultValue> 대학교 </option>
              </FormControl>
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInline
            id='personalInformationForm-major'
            type='text'
            label='계열'
            bsClass='form-control personal-text-custom-form custom-form'
            onChange={onInputChange('major')}
          />
        </div>

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInline
            id='personalInformationForm-location'
            type='text'
            label='소재지'
            bsClass='form-control personal-text-custom-form custom-form'
            onChange={onInputChange('location')}
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
                onChange={onInputChange('education.entrance')}
              />
              -
              <FieldGroup
                id='personalInformationForm-graduation-date'
                type='text'
                placeholder='YYYY/MM'
                bsClass='form-control graduation-date custom-form'
                onChange={onInputChange('education.graduation')}
              />
              <FormControl
                componentClass='select'
                bsClass='form-control graduation-status custorm-form'
                onChange={onInputChange('graduation.status')}
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

export default withStyles(meterialStyles)(PersonalInformation);



