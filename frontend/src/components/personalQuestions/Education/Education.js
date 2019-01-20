import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import FieldGroup from '../../common/Form/FieldGroup';
import FieldGroupWithLabelInline from '../../common/Form/FieldGroupWithLabelInline';
import FieldGroupWithLabelInlineAndChildren from '../../common/Form/FieldGroupWithLabelInlineAndChildren';

import classNames from 'classnames/bind';
import styles from './Education.scss';

const cx = classNames.bind(styles);

const meterialStyles = theme => ({

});

class PersonalInformation extends Component {
  render() {
    const { classes, personalFields, onInputChange } = this.props;
    const {  } = personalFields;

    return (
      <div className={cx('personal-form')}>
        <div className={cx('personal-form-title')}>
          <span>최종학력</span>
        </div>

        <hr/>

        <div className={cx('form-row')}>
            <FieldGroupWithLabelInline
              id='personalInformationForm-name'
              type='text'
              placeholder='이름을 입력하세요.'
              label='이름(한글)'
              bsClass='form-control personal-text-custom-form custom-form'
              onChange={onInputChange('name')}
            />

            <FieldGroupWithLabelInline
              id='personalInformationForm-englishName'
              type='text'
              placeholder='이메일을 입력하세요.'
              label='이름(영문)'
              bsClass='form-control personal-text-custom-form custom-form'
              onChange={onInputChange('englishName')}
            />
        </div>


        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-birth'
            label='성별'
          >
            <div className={cx('gender-button-holder')}>
              <Button variant='contained' classes={{root: classes.buttonRoot}}>
                남성
              </Button>
              <Button variant='contained' classes={{root: classes.buttonRoot}}>
                여성
              </Button>
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-birth'
            label='생년월일'
          >
            <div className={cx('birth-holder')}>
              <FieldGroup
                id='personalInformationForm-birth-year'
                type='text'
                placeholder='YYYY'
                bsClass='form-control birth-year custom-form'
                onChange={onInputChange('birth.year')}
              />
              <FieldGroup
                id='personalInformationForm-birth-month'
                type='text'
                placeholder='MM'
                bsClass='form-control birth-month custom-form'
                onChange={onInputChange('birth.month')}
              />
              <FieldGroup
                id='personalInformationForm-birth-date'
                type='text'
                placeholder='DD'
                bsClass='form-control birth-date custom-form'
                onChange={onInputChange('birth.date')}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-phoneNumber'
            label='휴대전화'
          >
            <div className={cx('phone-holder')}>
              <FormControl
                id='personalInformationForm-phoneNumber-year'
                componentClass='select'
                bsClass='form-control phone-holder-1 custorm-form'
              >
                <option value='010'> 010 </option>
                <option value='011'> 011 </option>
                <option value='016'> 016 </option>
                <option value='017'> 017 </option>
                <option value='018'> 018 </option>
                <option value='019'> 019 </option>
              </FormControl>
              <FieldGroup
                id='personalInformationForm-birth-month'
                type='text'
                bsClass='form-control phone-holder-2 custom-form'
                onChange={onInputChange('phoneNumber.second')}
              />
              <FieldGroup
                id='personalInformationForm-birth-date'
                type='text'
                bsClass='form-control phone-holder-3 custom-form'
                onChange={onInputChange('phoneNumber.third')}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInline
            id='personalInformationForm-address'
            type='text'
            placeholder='동까지만 입력해주시면 됩니다.'
            label='주소'
            bsClass='form-control personal-text-custom-form custom-form'
            onChange={onInputChange('address')}
          />
        </div>

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-email'
            label='text'
          >
            <div className={cx('email-holder')}>
              <FieldGroup
                id='personalInformationForm-email-text'
                type='text'
                bsClass='form-control email-text custom-form'
                onChange={onInputChange('email.text')}
              />

              <FormControl
                id='personalInformationForm-email-select'
                componentClass='select'
                bsClass='form-control email-type custorm-form'
                onChange={onInputChange('email.type')}
              >
                <option value=''> 직접입력 </option>
                <option value='naver.com'> naver.com </option>
                <option value='daum.net'> daum.net </option>
                <option value='gmail.com'> gmail.com </option>
                <option value='hanmail.net'> hanmail.net </option>
                <option value='nate.com'> nate.com </option>
              </FormControl>
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInline
            id='personalInformationForm-sns'
            type='text'
            label='SNS'
            bsClass='form-control personal-text-custom-form custom-form'
            onChange={onInputChange('sns')}
          />
        </div>
      </div>
    );
  }
};

export default withStyles(meterialStyles)(PersonalInformation);



