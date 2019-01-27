import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route, withRouter } from 'react-router-dom';
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



class NextSection extends Component {

  handleNextButtonClick = e => {
    const { history, config } = this.props;
    history.push(config.nextRoutePath);
  };

  handleCancleButtonClick = e => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { classes, pageType } = this.props;
    return (
      <div className={cx('next-button-holder', 'container')}>
        <Button variant='contained' classes={{ root: classes.buttonCancel }} onClick={this.handleCancleButtonClick}>
          취소
        </Button>
        {pageType !== 'interviewChoice' ?
          (
            <Button variant='contained' classes={{ root: classes.buttonNext }} onClick={this.handleNextButtonClick}>
              다음
            </Button>
          ) :
          (
            <Route render={({ history }) => (
              <Button
                variant='contained'
                classes={{ root: classes.buttonNext }}
                onClick={this.handleNextButtonClick}
              >
                제출
              </Button>
            )}
            />
          )

        }
      </div>
    )
  }

};

export default withStyles(meterialStyles)(NextSection);
