import React, { Component } from 'react';

import {
  withStyles,
  Button
} from '@material-ui/core';

import classNames from 'classnames/bind';
import styles from './NextSection.scss';

const cx = classNames.bind(styles);

const meterialStyles = theme => ({
  buttonCancel: {
    width: '140px',
    backgroundColor: '#f8f8f8',
    boxShadow: 'none',
    fontSize: '16px',
    fontWeight: '500',
    color: '#707070'
  },
  buttonNext: {
    width: '140px',
    backgroundColor: '#fa6d6d',
    boxShadow: 'none',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff'
  },
  buttonNextFullWidth: {
    width: '180px',
    backgroundColor: '#fa6d6d',
    boxShadow: 'none',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff'
  },
});

class NextSection extends Component {

  render() {
    const { classes, config, onPreviousButtonClick, onNextButtonClick } = this.props;
    return (
      <div className={cx('next-button-holder', 'container')}>
        { config.showPreviousSection &&
          <Button variant='contained' classes={{ root: classes.buttonCancel }} onClick={onPreviousButtonClick}>
            이전
          </Button>
        }
        <Button
          variant='contained'
          classes={{ root: config.showPreviousSection ?
          classes.buttonNext : classes.buttonNextFullWidth}}
          onClick={onNextButtonClick}>
          {config.pageType !== 'interviewChoice' ? '다음' : '제출'}
        </Button>
      </div>
    )
  }
};

export default withStyles(meterialStyles)(NextSection);
