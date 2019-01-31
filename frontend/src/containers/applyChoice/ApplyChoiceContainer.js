import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import {
  ApplyBusinessChoice,
  OtherAssignConsent,
  ApplyInformationModal
} from '../../components/applyChoice';

class ApplyChoiceContainer extends Component {
  render() {
    const { applyBusinessData } = this.props.staticData;

    return (
      <>
        <ApplyBusinessChoice title="1지망 지원 (필수)" applyBusinessData={applyBusinessData}/>
        <ApplyBusinessChoice title="2지망 지원 (선택)" isSecondApply={true} isSecondApplyChoice={true} applyBusinessData={applyBusinessData}/>
        <OtherAssignConsent/>
        <ApplyInformationModal/>
      </>

    );
  }
}

export default withRouter(connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(ApplyChoiceContainer));
