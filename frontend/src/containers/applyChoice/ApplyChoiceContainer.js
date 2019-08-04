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

import userApi from '../../apis/userApi'

class ApplyChoiceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applyInformationModalVisible: false,
      departmentDatas: []
    }
  }

  componentDidMount() {
    userApi.getDepartmentData()
      .then(departmentDatas => {
        this.setState({ departmentDatas });
      });
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
    const { staticData, selectedDepartments, applyActions } = this.props;
    const { departmentDatas } = this.state;
    applyActions.changeInput({[key] : value});
    applyActions.changeInput({
      [key.replace('department', 'team')]: departmentDatas
        .find(row => row.departmentName === value).teams[0].teamName 
      || ''
    });
    applyActions.changeInput({
      [key.replace('department', 'medical_field')]: departmentDatas
        .find(row => row.departmentName === value).teams[0].medicalFieldOptions[0]
      || ''
    });
  };

  handleChoiceSelectBox = (key, value) => {
    const { applyActions } = this.props;
    applyActions.changeInput({[key] : value});
  };

  handleClickSecondApply = e => {
    const { applyState, applyActions } = this.props;
    const { isSecondApplyChoice, applyChoiceFormat } = applyState;
    applyActions.changeInput({'isSecondApplyChoice' : !isSecondApplyChoice});
    applyActions.changeInput({'applyChoice.1' : applyChoiceFormat});
  };

  render() {
    const { applyChoice, otherAssignConsent, isSecondApplyChoice } = this.props.applyState;
    const { medicalAllOptions, medicalModalMessage } = this.props.staticData;
    const { departmentDatas } = this.state;

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
    selectedDepartments: state.apply.toJS().applyChoice.map(d => d.department)
  }),
  (dispatch) => ({
    applyActions: bindActionCreators(applyActions, dispatch),
  })
)(ApplyChoiceContainer));
