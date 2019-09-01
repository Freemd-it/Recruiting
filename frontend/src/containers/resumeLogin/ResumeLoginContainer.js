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
    alert(`안녕하세요. 
    프리메드 21기 리쿠르팅 사이트를 운영하고 있는 IT기획팀입니다.
    09월 01일 11시 26분을 기점으로 기존 작성된 지원서를 불러오지 못하는 에러가 발생하였습니다.
    해당 에러의 원인은 보안을 위해 지원자분들의 비밀번호를 암호화하는 시스템에 문제가 있는 것으로 파악되었습니다.
    시스템상의 문제이기 때문에 즉각적인 해결이 불가능한 상황입니다.
    
    이에 따라 기존 지원자분들의 지원서 작성 편의를 위해 기존 이름, 이메일, 비밀번호를 사용한 기존 지원서를 불러오는 방식에서 이름, 이메일만을 사용해 지원서를 불러오는 방식으로 변경하였습니다.
    또한 해당 에러로 지원서 작성에 문제가 생겼으므로 프리메드 21기 리쿠르팅 마감시간을 09월01일 18시 에서 09월 01일 24시로 변경하게 되었습니다.
    
    지원서 작성에 차질을 빚은 프리메드 21기 리쿠르팅에 지원해주시는 모든분들께 진심으로 사과드립니다.`);
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

