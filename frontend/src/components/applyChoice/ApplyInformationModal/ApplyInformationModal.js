import React from 'react';

import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import errorImage from '../../../images/error.png';

import Utils from '../../../common/utils'
import classNames from 'classnames/bind';
import styles from './ApplyInformationModal.scss';

const cx = classNames.bind(styles);

const meterialStyles = theme => ({
  titleText: {

  },
  contentRoot: {
    paddingLeft:'62.2px',
    paddingRight: '139.8px',
    paddingBottom: '55.4px',
    width: '1100px'
  },
  contentText: {
    color: '#707070',
    fontFamily: 'NotoSans-Light',
    fontSize: '18px',
    lineHeihgt: '27px'
  }
});

const ApplyInformationModal = (props) => {

  const { classes, message, open, onHide } = props;
  let { fullText: customText, enlargeText } = message;

  customText = Utils.lineBreak(customText);

  enlargeText.forEach(text => {
    if (customText.indexOf(text) !== -1 ) {
      customText = customText.replace(text, `<span class=${cx('dialog-enlarge-text')}>${text}</span>`);
    }
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={onHide}
        maxWidth={'xl'}
      >
        <DialogTitle disableTypography classes={{root:classes.titleText}} className={cx('apply-information-modal-title')}>
          <IconButton color="inherit" onClick={onHide} aria-label="Close" >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent classes={{root:classes.contentRoot}}>
          <DialogContentText classes={{root:classes.contentText}} id="alert-dialog-slide-description">
            <img className={cx('content-error-image')} alt="" src={errorImage}/>
            <span dangerouslySetInnerHTML={{__html: customText}}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withStyles(meterialStyles)(ApplyInformationModal);
