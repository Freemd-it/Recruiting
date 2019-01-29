import React from 'react';

import {
  withStyles,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';


import { SubsectionHeader } from '../../common';

import classNames from 'classnames/bind';
import styles from './OtherAssignConsent.scss';

const cx = classNames.bind(styles);


const meterialStyles = theme => ({
  formControlLabel: {
    fontFamily: 'NotoSans-Light',
    fontSize: '16px',
    color: '#707070',
  },

  formControlRootFirst: {
    marginLeft: '0px',
    lineHeight: '29px',
    borderTop: '1.2px solid #5c5959',
    borderBottom: '1.2px solid #5c5959',
    width: '100%'
  },
  formControlRootSecond: {
    marginLeft: '0px',
    lineHeight: '29px',
    borderBottom: '1.2px solid #5c5959',
    width: '100%'
  },

  checkBoxRoot: {
    color: '#ff5858',
    '&$checked': {
      color: '#ff5858',
    }
  },
  checked: {},
});

const OtherAssignConsent = ({ classes }) => {
  return (
    <div className={cx('other-assign-consent-container')}>
      <SubsectionHeader title="아래 사항들은 리쿠르팅 결과와 전혀 상관이 없습니다." noDivider={true}/>

      <div className={cx('other-assign-consent-form-container')}>
        <FormControlLabel
          classes={{root: classes.formControlRootFirst, label: classes.formControlLabel}}
          control={
            <Checkbox
              classes={{root: classes.checkBoxRoot, checked:classes.checked}}
            />
          }
          label='본인이 지원한 “NGO 운영 본부” 이외의 타 “NGO 운영 본부”에 배정될 의향이 있습니다.'
        />
        <FormControlLabel
          classes={{root: classes.formControlRootSecond, label: classes.formControlLabel}}
          control={
            <Checkbox
              classes={{root: classes.checkBoxRoot, checked:classes.checked}}
            />
          }
          label='본인이 지원한 “의료 사업” 이외의 타 “의료 사업”에 배정될 의향이 있습니다.'
        />
      </div>
    </div>
  );
}

export default withStyles(meterialStyles)(OtherAssignConsent);
