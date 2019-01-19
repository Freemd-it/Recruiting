import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames/bind';
import styles from './AlertModal.scss';

const cx = classNames.bind(styles);

class AlertModal extends Component {

  render() {
    const { classes } = this.props;
    return (
      <>

      </>
    );
  }
}

export default withStyles(AlertModal);
