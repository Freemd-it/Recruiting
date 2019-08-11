import React from 'react';

import classNames from 'classnames/bind';
import styles from './FileUploadForm.scss';

import AttachmentIcon from '@material-ui/icons/Attachment';

const cx = classNames.bind(styles);

const FileUploadForm = ({ onInputChange, type, index, questionKey, answer }) => {

  return (
    <div className={cx('file-upload-form')}>
      파일은 pdf 파일 포멧으로 정리하여 올리시면 됩니다, 용량 제한은 <strong>10MB</strong>입니다.
      <div className={cx('file-upload-container')}>
        <div className={cx('file-upload-name')}>
          {answer ? answer.name : ''}
        </div>
        <label htmlFor={`${questionKey}__${index}`} className={cx('file-upload-btn')}>
          <AttachmentIcon />
        </label>
        <input
          id={`${questionKey}__${index}`}
          type='file'
          accept=".pdf"
          onChange={onInputChange({ type, index, questionKey: questionKey, answerType: 'file' })}
        >
        </input>
      </div>
    </div>
  )
}

export default FileUploadForm;