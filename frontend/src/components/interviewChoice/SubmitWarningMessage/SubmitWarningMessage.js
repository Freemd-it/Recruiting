import React from 'react';
import ClassNames from 'classnames/bind';
import styles from './SubmitWarningMessage.scss';

const cx = ClassNames.bind(styles);

const SubmitWarningMessage = () => {
  return (
    <div className={(cx('warning-message'))}>
      작성하신 지원서를 제출하면 다시 <strong>수정이 불가능</strong>합니다. <br/>
      제출하시기 전에 지원서 내용을 확인해주세요.
    </div>
  )
}

export default SubmitWarningMessage;