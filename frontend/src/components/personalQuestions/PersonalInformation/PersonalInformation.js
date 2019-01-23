import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import FieldGroup from '../../common/Form/FieldGroup';
import FieldGroupWithLabelInline from '../../common/Form/FieldGroupWithLabelInline';
import FieldGroupWithLabelInlineAndChildren from '../../common/Form/FieldGroupWithLabelInlineAndChildren';

import classNames from 'classnames/bind';
import stylesCommon from '../common/PersonalQuestions.scss';
import styles from './PersonalInformation.scss';
import SubsectionHeader from '../../common/SubsectionHeader';

const cx = classNames.bind({...stylesCommon, ...styles});

const meterialStyles = theme => ({
  buttonRoot: {
    width: '175px',
    backgroundColor: '#f8f8f8',
    boxShadow: 'none',
    fontSize: '16px',
    fontWeight: '500',
    color: '#9f9f9f'
  },
  buttonCheckd: {
    backgroundColor: '#ff5858',
    color: '#ffffff',
    width: '175px',
    boxShadow: 'none',
    fontSize: '16px',
    fontWeight: '500',
    '&:hover': {
      background: '#ff5858'
    }
  }
});

class PersonalInformation extends Component {
  render() {
    const { classes, personalFields, onInputChange, onButtonChange } = this.props;
    const { name, englishName, gender, email } = personalFields;

    return (
      <div className={cx('personal-form')}>
        <SubsectionHeader title='인적사항' />

        <form>
          <div className={cx('form-row')}>
              <FieldGroupWithLabelInline
                type='text'
                value={name}
                placeholder='이름을 입력하세요.'
                label='이름(한글)'
                bsClass='form-control personal-text-custom-form custom-form'
                onChange={onInputChange('name')}
              />

              <FieldGroupWithLabelInline
                type='text'
                value={englishName}
                placeholder='이메일을 입력하세요.'
                label='이름(영문)'
                bsClass='form-control personal-text-custom-form custom-form'
                onChange={onInputChange('englishName')}
              />
          </div>

          <div className={cx('form-row')}>
            <FieldGroupWithLabelInlineAndChildren
              label='성별'
            >
              <div className={cx('personal-form-holder')}>
                <Button component='button' variant='contained' classes={{root: gender === 'mail' ? classes.buttonCheckd : classes.buttonRoot}} onClick={() => onButtonChange('gender','mail')} >
                  남성
                </Button>
                <Button variant='contained' classes={{root: gender === 'femail' ? classes.buttonCheckd  : classes.buttonRoot}} onClick={() => onButtonChange('gender', 'femail')}>
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
                  onChange={onInputChange('birth.year')}
                />
                <FieldGroup
                  type='text'
                  placeholder='MM'
                  bsClass='form-control birth-month custom-form'
                  onChange={onInputChange('birth.month')}
                />
                <FieldGroup
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
              label='휴대전화'
            >
              <div className={cx('personal-form-holder')}>
                <FormControl
                  componentClass='select'
                  bsClass='form-control phone-holder-1 custorm-form'
                  onChange={onInputChange('phoneNumber.first')}
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
              type='text'
              placeholder='동까지만 입력해주시면 됩니다.'
              label='주소'
              bsClass='form-control personal-text-custom-form custom-form'
              onChange={onInputChange('address')}
            />
          </div>

          <div className={cx('form-row')}>
            <FieldGroupWithLabelInlineAndChildren
              label='E-mail'
            >
              <div className={cx('personal-form-holder')}>
                <FieldGroup
                  type= {!email ? 'email' : 'text'}
                  bsClass='form-control email-text custom-form'
                  onChange={onInputChange('email.text')}
                />
                <FormControl
                  componentClass='select'
                  bsClass='form-control email-type custorm-form'
                  onChange={onInputChange('email.type')}
                >
                  <option value=''> 직접입력 </option>
                  <option value='@naver.com'> naver.com </option>
                  <option value='@daum.net'> daum.net </option>
                  <option value='@gmail.com'> gmail.com </option>
                  <option value='@hanmail.net'> hanmail.net </option>
                  <option value='@nate.com'> nate.com </option>
                </FormControl>
              </div>
            </FieldGroupWithLabelInlineAndChildren>

            <FieldGroupWithLabelInline
              type='text'
              label='SNS'
              bsClass='form-control personal-text-custom-form custom-form'
              onChange={onInputChange('sns')}
            />
          </div>
        </form>
      </div>
    );
  }
};

export default withStyles(meterialStyles)(PersonalInformation);



