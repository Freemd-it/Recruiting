import React from 'react';

import classNames from 'classnames/bind';
import styles from './TechSelectForm.scss';
import { RadioGroup, FormControlLabel, Radio, withStyles } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const cx = classNames.bind(styles);
const materialStyles = () => ({
  group: {
    margin: '0px 40px'
  },
  formLabel: {
    fontFamily: 'NotoSans-Light',
    color: '#707070',
    fontSize: '16px'
  },
  radio: {
    color: '#ff5858'
  }
});

const TechSelectForm = ({ onInputChange, type, index, questionClassId, answer, classes }) => {

  const techNames = [
    'JavaScript', 'HTML', 'jQuery', 'SQL', 'Linux', 'CSS', 'PHP', 'NodeJS'
  ];

  const degreeNames = [
    '상', '중', '하', '사용불가'
  ];

  return (
    <div className={cx('tech-select-form')}>
      <div className={cx('select-form-row')}>
        <div className={cx('name-cell select-form-row-title')}>
          프로그램 명
        </div>
        <div className={cx('select-cell select-form-row-title')}>
          활용가능 수준
        </div>
      </div>
      {techNames.map((techName, techIndex) => (
        <div key={`${techName}__${techIndex}`} className={cx('select-form-row')}>
          <div className={cx('name-cell')}>
            {techName}
          </div>
          <div className={cx('select-cell')}>
            <RadioGroup
              row
              defaultValue={'3'}
              value={answer ? answer[techName] : '3'}
              onChange={onInputChange({ type, index, questionClassId, techName, answerType: 'select'})}
            >
              {degreeNames.map((abilityName, abilityIndex) => (
                <FormControlLabel 
                  key={`${abilityName}__${abilityIndex}`}
                  classes={{label: classes.formLabel}} 
                  className={classes.group}
                  value={abilityIndex.toString()} 
                  control={
                    <Radio
                      classes={{root: classes.radio}}
                      icon={<RadioButtonUncheckedIcon fontSize='small' />}
                      checkedIcon={<RadioButtonCheckedIcon fontSize='small' />}
                    />} 
                  label={abilityName}
                />
              ))}
            </RadioGroup>
          </div>
        </div>
      ))}
    </div>
  )
}

export default withStyles(materialStyles)(TechSelectForm);
