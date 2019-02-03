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

  handleChoiceNGOBusiness = (key, value) => {
    const { applyActions } = this.props;
    applyActions.changeInput({[key] : value});
  };

  handleChoiceNGOTeam = e => {
    
  };

  handleChoiceMedicalBusiness = e => {

  };

  handleClickSecondApply = e => {
    const { applyActions, applyState } = this.props;
    const { isSecondApplyChoice, applyChoiceFormat } = applyState;
    applyActions.changeInput({'isSecondApplyChoice' : !isSecondApplyChoice});

    if (!isSecondApplyChoice) {
      applyActions.changeInput({'applyChoice.1' : applyChoiceFormat});
    }
  };

  render() {
    const { applyChoice, otherAssignConsent, isSecondApplyChoice } = this.props.applyState;
    const { applyDepartmentData, medicalModalMessage } = this.props.staticData;

    return (
      <>
        <ApplyBusinessChoice
          title="1지망 지원 (필수)"
          applyChoiceFields={applyChoice}
          applyDepartmentData={applyDepartmentData}
          onShowModal={this.handleMedicalDescriptionClick}
          onChoiceNGOBusiness={this.handleChoiceNGOBusiness}
        />
        <ApplyBusinessChoice
          title="2지망 지원 (선택)"
          isSecondApply={true}
          isSecondApplyChoice={isSecondApplyChoice}
          applyChoiceFields={applyChoice}
          applyDepartmentData={applyDepartmentData}
          onShowModal={this.handleMedicalDescriptionClick}
          onChoiceNGOBusiness={this.handleChoiceNGOBusiness}
          onClickSecondApply={this.handleClickSecondApply}
        />
        <OtherAssignConsent
          otherAssignConsentFields={otherAssignConsent}
          open={this.state.applyInformationModalVisible}
          onHide={this.handleLogoutCompleteModalHide}
          onInputChange={this.handleCheckBoxChange}
        />
        <ApplyInformationModal
          open={this.state.applyInformationModalVisible}
          onHide={this.handleMedicalDescriptionHide}
          message={medicalModalMessage}
        />
      </>

    );
  }
}

export default withRouter(connect(
  (state) => ({
    applyState: state.apply.toJS(),
  }),
  (dispatch) => ({
    applyActions: bindActionCreators(applyActions, dispatch),
  })
)(ApplyChoiceContainer));
