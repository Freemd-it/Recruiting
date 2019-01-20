import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './FieldGroupWithLabelInline.scss';

const cx = classNames.bind(styles);

const FieldGroupWithLabelInline = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <div className={cx('field-group-inline')}>
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </div>

    </FormGroup>
  )
};

export default FieldGroupWithLabelInline;
