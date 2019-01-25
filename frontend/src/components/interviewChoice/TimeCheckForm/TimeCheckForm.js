import React from 'react';

import classNames from 'classnames/bind';
import styles from './TimeCheckForm.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const cx = classNames.bind(styles);

const isChecked = (checkedFields, day, time) => {
  const dayIndex = checkedFields.findIndex(d => d.day === day);
  if (dayIndex === -1) {
    return false;
  } else {
    const timeIndex = checkedFields[dayIndex].times.findIndex(d => d === time);
    return timeIndex !== -1
  }
}

const TimeCheckForm = ({ date, index, onCheckedChange, checkedFields }) => {

  const { day, times } = date;

  return (
    <div className={(cx('time-check-form'))}>
      {index != 0 ? (<hr />) : ''}
      <div className={(cx('time-check-form-content'))}>
        <div className={(cx('form-day'))}>
          {day}
        </div>
        <div className={(cx('form-times'))}>
          {times.map((time, index) => (
            <div key={`CheckBox__${index}`} className={(cx('time-check-box'))}>
              <FormControlLabel
                control={
                  <Checkbox onChange={onCheckedChange(day, time)} checked={isChecked(checkedFields, day, time)}/>
                }
                label={
                  time
                }
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