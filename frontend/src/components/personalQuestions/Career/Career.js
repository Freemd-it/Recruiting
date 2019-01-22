import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import FieldGroup from '../../common/Form/FieldGroup';
import FieldGroupWithLabelInline from '../../common/Form/FieldGroupWithLabelInline';
import FieldGroupWithLabelInlineAndChildren from '../../common/Form/FieldGroupWithLabelInlineAndChildren';

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './Career.scss';

const cx = classNames.bind({...stylesCommon, ...styles});

const meterialStyles = theme => ({

});

class Career extends Component {
  render() {
    const { classes, personalFields, onInputChange } = this.props;
    const {  } = personalFields;

    return (
      <div className={cx('personal-form')}>
        <div className={cx('personal-form-title')}>
          <span>경력</span>
        </div>

        <hr/>

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-career-division'
            label='활동구분'

          >
            <div className={cx('personal-form-holder')}>
              <FormControl
                componentClass='select'
                bsClass='form-control career-division-item-1 custorm-form'
              >
                <option value='인턴'> 인턴 </option>
              </FormControl>
              <FieldGroup
                id='personalInformationForm-career-division-text'
                type='text'
                placeholder="회사/기관/단체명"
                bsClass='form-control career-division-item-2 placeholder-right custom-form'
                onChange={onInputChange('career.divisionText')}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-career-duration'
            label='활동기간'
          >
            <div className={cx('personal-form-holder')}>
              <FieldGroup
                id='personalInformationForm-career-duration-start'
                type='text'
                placeholder='YYYY/MM'
                bsClass='form-control career-duration-text custom-form'
                onChange={onInputChange('career.duration')}
              />
              -
              <FieldGroup
                id='personalInformationForm-career-duration-end'
                type='text'
                placeholder='YYYY/MM'
                bsClass='form-control career-duration-text graduation-date custom-form'
                onChange={onInputChange('career.duration')}
              />
              <FieldGroup
                id='personalInformationForm-career-duration-time'
                type='text'
                placeholder="시간"
                bsClass='form-control career-duration-time placeholder-right custom-form'
                onChange={onInputChange('career.time')}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>


        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-career-detail-text'
            label='활동내역'
            full={true}
          >
            <div className={cx('personal-full-form-holder')}>
              <FormControl
                componentClass='textarea'
                bsClass='form-control custorm-form'
              >
              </FormControl>
            </div>

          </FieldGroupWithLabelInlineAndChildren>
        </div>


      </div>
    );
  }
};

export default withStyles(meterialStyles)(Career);



