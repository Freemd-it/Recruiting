import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import {
  withStyles,
  Button
} from '@material-ui/core';

import classNames from 'classnames/bind';
import styles from './NextSection.scss';

const cx = classNames.bind(styles);

const meterialStyles = theme => ({
  buttonNext: {
    width: '180px',
    backgroundColor: '#fa6d6d',
    boxShadow: 'none',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff'
  }
});

class NextSection extends Component {

  handleNextButtonClick = e => {
    const { history, config, state } = this.props;
    console.log(config);
    const actionModule = state[config.validationModuleKey].toJS()
    if (actionModule.validate) {
      history.push(config.nextRoutePath);
    }
  };
  
  render() {
    const { classes, config } = this.props;
    return (
      <div className={cx('next-button-holder', 'container')}>
        {config.pageType !== 'interviewChoice' ?
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

export default withRouter(connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({

  })
)(withStyles(meterialStyles)(NextSection)));
// export default withStyles(meterialStyles)(NextSection);
