import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import {  } from '../../components/interviewChoice';
import SectionTitle from '../../components/common/SectionTitle';
import InterviewNotice from '../../components/interviewChoice/InterviewNotice/InterviewNotice';

class InterviewChoiceContainer extends Component {
  render() {
    const { } = this.props;

    return (
      <>
        <SectionTitle title='인터뷰 시간 선택' />
        <InterviewNotice />
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
