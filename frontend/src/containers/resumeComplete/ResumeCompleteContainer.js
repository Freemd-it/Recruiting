import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ResumeComplete from '../../components/resumeComplete/ResumeComplete';

class ResumeCompleteContainer extends Component {
  render() {
    const { batch } = this.props;

    return (
      <>
        <ResumeComplete batch={batch} />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    batch: state.user.get('batch')
  }),
  (dispatch) => ({
  })
)(ResumeCompleteContainer));
