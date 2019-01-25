import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

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
  }
});

const NextSection = (props) => {
  const { classes, showNextSection } = props;

  return (
    <div className={cx('next-button-holder', 'container')}>
      <Button variant='contained' classes={{root: classes.buttonCancel}}>
        취소
      </Button>
      {showNextSection ? 
        (
          <Button variant='contained' classes={{root: classes.buttonNext}}>
            다음
          </Button>
        ) :
        (
          <Button variant='contained' classes={{root: classes.buttonNext}}>
            제출
          </Button>
        )}
    </div>
  )
};

export default withStyles(meterialStyles)(NextSection);
