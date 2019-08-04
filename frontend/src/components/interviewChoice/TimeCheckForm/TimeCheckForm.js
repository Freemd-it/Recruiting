import React from 'react';
import moment from 'moment';

import { FormControlLabel, Checkbox } from '@material-ui/core';

import classNames from 'classnames/bind';
import styles from './TimeCheckForm.scss';

const cx = classNames.bind(styles);

const isChecked = (checkedFields, date, time) => {
  const dayIndex = checkedFields.findIndex(d => d.date === date);
  if (dayIndex === -1) {
    return false;
  } else {
    const timeIndex = checkedFields[dayIndex].times.findIndex(d => d === time);
    return timeIndex !== -1
  }
}

const TimeCheckForm = ({ elem, index, onCheckedChange, checkedFields }) => {

  const { date, times } = elem;
  return (
    <div className={(cx('time-check-form'))}>
      {index !== 0 ? (<hr />) : ''}
      <div className={(cx('time-check-form-content'))}>
        <div className={(cx('form-day'))}>
          {moment(date).format(`MM. DD. ${index === 0 ? '토' : '일'}`)}
        </div>
        <div className={(cx('form-times'))}>
          {times.map((time, timeIndex) => (
            <div key={`CheckBox__${timeIndex}`} className={(cx('time-check-box'))}>
              <FormControlLabel
                control={
                  <Checkbox onChange={onCheckedChange({date, time, index})} checked={isChecked(checkedFields, date, time)}/>
                }
                label={time}
              >
              </FormControlLabel>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimeCheckForm
