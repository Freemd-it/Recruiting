import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { SectionTitle } from '../../components/common';
import { ApplyBusinessChoice, ApplyInformationModal } from '../../components/applyChoice';

class ApplyChoiceContainer extends Component {
  render() {
    return (
      <>
        <SectionTitle title="1지망 지원 (필수)"/>
        <ApplyBusinessChoice/>

        <SectionTitle title="2지망 지원 (선택)"/>
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
