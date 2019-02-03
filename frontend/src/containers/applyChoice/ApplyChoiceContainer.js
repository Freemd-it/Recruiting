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
    const { staticData, applyActions } = this.props;
    const { departmentDatas } = staticData;

    applyActions.changeInput({[key] : value});
    applyActions.changeInput({[key.replace('department', 'team')]: departmentDatas.find(row => row.name === value).teams[0]})
    applyActions.changeInput({[key.replace('department', 'medical')]: departmentDatas.find(row => row.name === value).medicalOptions[0]})

  };

  handleChoiceSelectBox = (key, value) => {
    const { applyActions } = this.props;
    applyActions.changeInput({[key] : value});
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
    const { departmentDatas, medicalAllOptions, medicalModalMessage } = this.props.staticData;

    return (
      <>
        <ApplyBusinessChoice
          title="1지망 지원 (필수)"
          departmentDatas={departmentDatas}
          medicalAllOptions={medicalAllOptions}
          applyChoice={applyChoice}
          onShowModal={this.handleMedicalDescriptionClick}
          onChoiceNGOBusiness={this.handleChoiceNGOBusiness}
          onChoiceSelectBox={this.handleChoiceSelectBox}
        />
        <ApplyBusinessChoice
          title="2지망 지원 (선택)"
          isSecondApply={true}
          departmentDatas={departmentDatas}
          medicalAllOptions={medicalAllOptions}
          isSecondApplyChoice={isSecondApplyChoice}
          applyChoice={applyChoice}
          onShowModal={this.handleMedicalDescriptionClick}
          onChoiceNGOBusiness={this.handleChoiceNGOBusiness}
          onChoiceSelectBox={this.handleChoiceSelectBox}
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
