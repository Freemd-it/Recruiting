import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import {  } from '../../components/interviewChoice';

class InterviewChoiceContainer extends Component {
  render() {
    const { } = this.props;

    return (
      <>

      </>

    );
  }
}

export default withRouter(connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(InterviewChoiceContainer));
