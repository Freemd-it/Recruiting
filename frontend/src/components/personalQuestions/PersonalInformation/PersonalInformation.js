import React, { Component } from 'react';

import { FormControl } from 'react-bootstrap';
import {
  withStyles,
  Button
} from '@material-ui/core';

import {
  SubsectionHeader,
  FieldGroup,
  FieldGroupWithLabelInline,
  FieldGroupWithLabelInlineAndChildren
} from '../../common';

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './PersonalInformation.scss';

const cx = classNames.bind({...stylesCommon, ...styles});

const meterialStyles = theme => ({
  buttonRoot: {
    width: '175px',
    backgroundColor: '#f8f8f8',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: 'NotoSans-Medium',

    color: '#9f9f9f'
  },
  buttonChecked: {
    backgroundColor: '#ff5858',
    color: '#ffffff',
    width: '175px',
    boxShadow: 'none',
    fontSize: '16px',
    fontFamily: 'NotoSans-Medium',
    '&:hover': {
      background: '#ff5858'
    }
  },
  checked: {},
});

class PersonalInformation extends Component {
  render() {
    const { classes, userFields, personalFields, onInputChange, onButtonChange } = this.props;
    const { name, englishName, gender, email, birth, phoneNumber, address, sns } = personalFields.personalIdentification;

    return (
      <div className={cx('personal-form')}>
        <SubsectionHeader title='인적사항' />

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInline
            type='text'
            placeholder='이름을 입력하세요.'
            label='이름(한글)'
            bsClass='form-control personal-text-custom-form custom-form'
            value={userFields.name}
            readonly={true}
            // onChange={onInputChange('personalIdentification.name', false)}
          />

          <FieldGroupWithLabelInline
            type='text'
            placeholder='영문 이름을 입력하세요.'
            label='이름(영문)'
            bsClass='form-control personal-text-custom-form custom-form'
            value={englishName}
            onChange={onInputChange('personalIdentification.englishName', false)}
          />
        </div>

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            label='성별'
          >
            <div className={cx('personal-form-holder')}>
              <Button classes={{root: gender === 'male' ? classes.buttonChecked : classes.buttonRoot}} onClick={() => onButtonChange('personalIdentification.gender','male')} >
                남성
              </Button>
              <Button classes={{root: gender === 'female' ? classes.buttonChecked  : classes.buttonRoot}} onClick={() => onButtonChange('personalIdentification.gender', 'female')}>
                여성
              </Button>
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInlineAndChildren
            label='생년월일'
          >
            <div className={cx('personal-form-holder')}>
              <FieldGroup
                type='text'
                placeholder='YYYY'
                bsClass='form-control birth-year custom-form'
                value={birth.year}
                onChange={onInputChange('personalIdentification.birth.year', true, '-')}
              />
              <FieldGroup
                type='text'
                placeholder='MM'
                bsClass='form-control birth-month custom-form'
                value={birth.month}
                onChange={onInputChange('personalIdentification.birth.month', true, '-')}
              />
              <FieldGroup
                type='text'
                placeholder='DD'
                bsClass='form-control birth-date custom-form'
                value={birth.date}
                onChange={onInputChange('personalIdentification.birth.date', true, '-')}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            label='휴대전화'
          >
            <div className={cx('personal-form-holder')}>
              <FormControl
                componentClass='select'
                bsClass='form-control phone-holder-1 custorm-form'
                value={phoneNumber.first}
                onChange={onInputChange('personalIdentification.phoneNumber.first', true, '-')}
              >
                <option value='010'> 010 </option>
                <option value='011'> 011 </option>
                <option value='016'> 016 </option>
                <option value='017'> 017 </option>
                <option value='018'> 018 </option>
                <option value='019'> 019 </option>
              </FormControl>
              <FieldGroup
                type='text'
                bsClass='form-control phone-holder-2 custom-form'
                value={phoneNumber.second}
                onChange={onInputChange('personalIdentification.phoneNumber.second', true, '-')}
              />
              <FieldGroup
                type='text'
                bsClass='form-control phone-holder-3 custom-form'
                value={phoneNumber.third}
                onChange={onInputChange('personalIdentification.phoneNumber.third', true, '-')}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          <FieldGroupWithLabelInline
            type='text'
            placeholder='동까지만 입력해주시면 됩니다.'
            label='주소'
            bsClass='form-control personal-text-custom-form custom-form'
            value={address}
            onChange={onInputChange('personalIdentification.address', false)}
          />
        </div>

        <div className={cx('form-row')}>
          {/* <FieldGroupWithLabelInlineAndChildren
            label='E-mail'
          >
            <div className={cx('personal-form-holder')}>
              <FieldGroup
                type= {!email ? 'email' : 'text'}
                bsClass='form-control email-text custom-form'
                value={email.text}
                onChange={onInputChange('personalIdentification.email.text', true)}
              />
              <FormControl
                componentClass='select'
                bsClass='form-control email-type custorm-form'
                value={email.type}
                onChange={onInputChange('personalIdentification.email.type', true)}
              >
                TODO: 추후에 직접입력 로직을 따로 구현하거나 입력해야함.
                <option value=''> 직접입력 </option>
                <option value='@naver.com'> naver.com </option>
                <option value='@daum.net'> daum.net </option>
                <option value='@gmail.com'> gmail.com </option>
                <option value='@hanmail.net'> hanmail.net </option>
                <option value='@nate.com'> nate.com </option>
              </FormControl>
            </div>
          </FieldGroupWithLabelInlineAndChildren> */}

          <FieldGroupWithLabelInline
            type='text'
            label='SNS'
            bsClass='form-control personal-text-custom-form custom-form'
            value={sns}
            onChange={onInputChange('personalIdentification.sns')}
          />
        </div>
      </div>
    );
  }
};

export default withStyles(meterialStyles)(PersonalInformation);



