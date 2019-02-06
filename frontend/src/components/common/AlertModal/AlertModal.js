import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

const meterialStyles = theme => ({
  contentText: {
    fontFamily: 'NotoSans-Light',
    fontSize: '14px'
  }
});

class AlertModal extends Component {

  render() {
    const { classes, open, onHide, reason} = this.props;
    return (
      <>
      <Dialog
        open={open}
        onClose={onHide}
        maxWidth={'md'}

      >
        <DialogContent>
          <DialogContentText classes={{root: classes.contentText}} id="alert-dialog-slide-description">
            {reason.split('\\n').map((line, index) => {return (<span key={index}>{line}<br/></span>)})}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHide} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
  }
}

export default withStyles(meterialStyles)(AlertModal);
