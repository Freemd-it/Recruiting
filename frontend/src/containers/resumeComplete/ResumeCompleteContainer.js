import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { RequestConsentForm } from '../../components/personalQuestions';

class ResumeCompleteContainer extends Component {
  render() {
    const { } = this.props;

    return (
      <>
        <RequestConsentForm/>
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
