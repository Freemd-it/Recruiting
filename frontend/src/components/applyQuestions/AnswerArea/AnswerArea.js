import React from 'react';

import classNames from 'classnames/bind';
import styles from './AnswerArea.scss';

const cx = classNames.bind(styles);

const AnswerArea = ({ onInputChange, type, index, questionClassId, answer }) => {
  return (
    <div className={cx('answer-area-form')}>
      <textarea 
        onChange={onInputChange({type, index, questionClassId, answerType: 'text'})} 
        value={answer}
        placeholder={questionClassId ? '같은 본부 지원 시 본부 공통 질문 미답변 해주세요.': ''}
      >
      </textarea>
      <div className={cx('text-length-view')}>{answer ? answer.length : '0'}/500</div>
    </div>
  )
}

export default AnswerArea;