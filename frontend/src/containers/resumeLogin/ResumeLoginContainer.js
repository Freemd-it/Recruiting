import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { LoginForm } from '../../components/resumeLogin';

import {
  userActions,
  personalActions,
  applyActions,
  interviewActions
} from '../../reducers';

import message from '../../common/message';
import { SupportStatusType } from '../../common/types';
import userApi from '../../apis/userApi'

class ResumeLoginContainer extends Component {

  handleInputChange = name => event => {
    const { userActions } = this.props;
    userActions.changeInput({[name] : event.target.value});
  };

  handleSubmit = async (e) => {
    const { userFields, userActions } = this.props;

    e.preventDefault();

    let loginData;
    try {
      loginData = await userApi.login(userFields);

      if (loginData[2] !== SupportStatusType.PROCEEDING) {
        window.alert(message.alreadySubmitted);
        return;
      }
    } catch (err) {
        window.alert(message.serverError);
        return;
    }

    /**
     * id redux 저장 및 기존 store 초기화, store 데이터 세팅
     */
    userActions.changeInput({id : loginData[1]});
    const storeData = await userApi.getStoreDataByUser(loginData[1], window.localStorage.accessToken);

    this._initStoreAndLoadSaved(storeData);

    this.props.history.push('/personalQuestions');
  };

  _initStoreAndLoadSaved = (storeData) => {
    const { personalActions, applyActions, interviewActions } = this.props;
    const actions = [ personalActions, applyActions, interviewActions ];

    // 초기화
    actions.forEach(action => {
      action.initState();
    });

    // Load
    if (Object.keys(storeData).length > 0 && window.confirm(message.loadSaved)) {
      const actionsObjForload = {
        personal: personalActions,
        apply: applyActions,
        interview: interviewActions,
      };

      Object.keys(actionsObjForload).forEach(key => {
        actionsObjForload[key].loadSavedState(storeData[key])
      });
    }
  };

  render() {
    const { userFields } = this.props;
    return (
      <>
        <LoginForm
          userFields={userFields}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    userFields: state.user.toJS(),
  }),
  (dispatch) => ({
    userActions: bindActionCreators(userActions, dispatch),
    personalActions: bindActionCreators(personalActions, dispatch),
    applyActions: bindActionCreators(applyActions, dispatch),
    interviewActions: bindActionCreators(interviewActions, dispatch),
  })
)(ResumeLoginContainer));

