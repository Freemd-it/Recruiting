import React from 'react';

import classNames from 'classnames/bind';
import styles from './FileUploadForm.scss';

import AttachmentIcon from '@material-ui/icons/Attachment';

const cx = classNames.bind(styles);

const FileUploadForm = ({ onInputChange, type, index, name, answer }) => {

  return (
    <div className={cx('file-upload-form')}>
      <div className={cx('file-upload-name')}>
        {answer ? answer.name : ''}
      </div>
      <label htmlFor={`${name}__${index}`} className={cx('file-upload-btn')}>
        <AttachmentIcon />
      </label>
      <input
        id={`${name}__${index}`}
        type='file'
        onChange={onInputChange({ type, index, name, answerType: 'file' })}
      >
      </input>
    </div>
  )
}

export default FileUploadForm;