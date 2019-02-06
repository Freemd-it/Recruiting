import React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './FieldGroupWithLabelInlineAndChildren.scss';

const cx = classNames.bind(styles);

const FieldGroupWithLabelInlineAndChildren = ({ id, label, help, children, full, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <div className={cx(!full ? 'field-group-inline' : 'field-group-full-inline')}>
        {label && <ControlLabel>{label}</ControlLabel>}
        {children}
        {help && <HelpBlock>{help}</HelpBlock>}
      </div>

    </FormGroup>
  )
};

export default FieldGroupWithLabelInlineAndChildren;
