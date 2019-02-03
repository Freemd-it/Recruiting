import React from 'react';

import classNames from 'classnames/bind';
import styles from './AnswerArea.scss';

const cx = classNames.bind(styles);

const AnswerArea = ({ onInputChange, type, index, name, answer }) => {

  return (
    <div className={cx('answer-area-form')}>
      <textarea onChange={onInputChange({type, index, name, answerType: 'text'})} value={answer}></textarea>
      <div className={cx('text-length-view')}>{answer ? answer.length : '0'}/500</div>
    </div>
  )
}

export default AnswerArea;