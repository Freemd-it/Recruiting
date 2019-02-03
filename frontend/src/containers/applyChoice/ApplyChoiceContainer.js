import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import {
  ApplyBusinessChoice,
  OtherAssignConsent,
  ApplyInformationModal
} from '../../components/applyChoice';

import * as applyActions from '../../modules/apply';

class ApplyChoiceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applyInformationModalVisible: false
    }
  }

  handleMedicalDescriptionClick = e => {
    this.setState({applyInformationModalVisible: true})
  };

  handleMedicalDescriptionHide = e => {
    this.setState({applyInformationModalVisible: false})
  };

  handleCheckBoxChange = name => event => {
    const { applyActions } = this.props;
    applyActions.changeInput({[name] : event.currentTarget.checked});
  };

  render() {
    const { otherAssignConsentFields } = this.props;
    const { applyBusinessData, medicalModal } = this.props.staticData;

    return (
      <>
        <ApplyBusinessChoice
          title="1지망 지원 (필수)"
          applyBusinessData={applyBusinessData}
          onShowModal={this.handleMedicalDescriptionClick}
        />
        <ApplyBusinessChoice
          title="2지망 지원 (선택)"
          isSecondApply={true}
          isSecondApplyChoice={true}
          applyBusinessData={applyBusinessData}
          onShowModal={this.handleMedicalDescriptionClick}
        />
        <OtherAssignConsent
          otherAssignConsentFields={otherAssignConsentFields}
          open={this.state.applyInformationModalVisible}
          onHide={this.handleLogoutCompleteModalHide}
          onInputChange={this.handleCheckBoxChange}
        />
        <ApplyInformationModal
          open={this.state.applyInformationModalVisible}
          onHide={this.handleMedicalDescriptionHide}
          message={medicalModal}
        />
      </>

    );
  }
}

export default withRouter(connect(
  (state) => ({
    otherAssignConsentFields: state.apply.get('otherAssignConsent').toJS(),
  }),
  (dispatch) => ({
    applyActions: bindActionCreators(applyActions, dispatch),
  })
)(ApplyChoiceContainer));
