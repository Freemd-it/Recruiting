import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './FieldGroupWithLabelInlineAndChildren.scss';

const cx = classNames.bind(styles);

const FieldGroupWithLabelInlineAndChildren = ({ id, label, help, children,...props }) => {
  return (
    <FormGroup controlId={id}>
      <div className={cx('field-group-inline')}>
        {label && <ControlLabel>{label}</ControlLabel>}
        {children}
        {help && <HelpBlock>{help}</HelpBlock>}
      </div>

    </FormGroup>
  )
};

export default FieldGroupWithLabelInlineAndChildren;
