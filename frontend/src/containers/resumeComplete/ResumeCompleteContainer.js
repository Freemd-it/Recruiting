import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ResumeComplete from '../../components/resumeComplete/ResumeComplete';

class ResumeCompleteContainer extends Component {
  render() {
    const { } = this.props;

    return (
      <>
        <ResumeComplete />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(ResumeCompleteContainer));
