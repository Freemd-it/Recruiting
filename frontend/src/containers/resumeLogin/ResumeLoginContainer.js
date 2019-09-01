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

import { SupportStatusType } from '../../common/types';
import message from '../../common/message';

import userApi from '../../apis/userApi'

class ResumeLoginContainer extends Component {

  componentDidMount() {
    const { userActions } = this.props;
    userApi.getBatch().then(batch => {
      userActions.changeInput({batch: batch});
    });
    alert('프리메드 IT 기획팀입니다. 현재 보안을 위해서 지원자 분들이 입력한 비밀번호를 암호화 하여 저장하는 부분에 문제가 생겼습니다.\n\n'+
          '이에 저희 팀은 성함과 이메일만으로 지원서를 작성할 수 있게끔 조치하였으며, 불편을 겪으신 분들께는 정말 죄송하다는 말씀을 드립니다.\n\n' +
          '덧붙여 21기 리크루팅은 9월 1일 자정으로 연장되었음을 알려드립니다.');
  }

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

      if (!this._loginCheck(loginData)) {
        return;
      }
    } catch (err) {
        console.log(err.message);
        if (err.message.includes('failed with status code 403')) {
          window.alert(message.LOGIN_FAIL);
          return;
        }
        window.alert(message.SERVER_ERROR);
    }

    /**
     * id redux 저장 및 기존 store 초기화, store 데이터 세팅
     */
    userActions.changeInput({id : loginData.results[1]});
    const storeData = await userApi.getStoreDataByUser(loginData.results[1], window.localStorage.accessToken);

    this._initStoreAndLoadSaved(storeData);

    this.props.history.push('/personalQuestions');
  };

  _loginCheck = (loginData) => {
    if (!loginData.results && loginData.isExistEmail) {
      window.alert(message.EXIST_EMAIL);
      return false;
    }

    if (loginData.results[2] !== SupportStatusType.PROCEEDING) {
      window.alert(message.ALREADY_SUBMITTED);
      return false;
    }

    return true;
  };

  _initStoreAndLoadSaved = (storeData) => {
    const { personalActions, applyActions, interviewActions } = this.props;
    const actions = [ personalActions, applyActions, interviewActions ];

    // 초기화
    actions.forEach(action => {
      action.initState();
    });

    // Load
    if (Object.keys(storeData).length > 0 && window.confirm(message.LOAD_SAVED)) {
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

