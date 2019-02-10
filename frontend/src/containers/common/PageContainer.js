import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { personalActions, applyActions, interviewActions, userActions } from '../../reducers';

import { CheckLevelType } from '../../common/types';
import validation from '../../common/validation';
import message from '../../common/message';

import userApi from '../../apis/userApi';
import recruitingApi, { convertModelToSchemaBased } from '../../apis/recruitingApi';

class PageContainer extends Component {

  componentDidMount() {
    window.scrollTo({ top: 100 });
  };

  handlePreviousButtonClick = e => {
    const { history, config } = this.props;
    history.push(config.previousRoutePath);

  };

  handleNextButtonClick = e => {
    const { match, history, config, state } = this.props;

    const actionModule = state[config.validationModuleKey].toJS();

    const validateResult = this._validateByPage(match, actionModule, config.validation);

    if (validateResult) {
      if (config.pageType === 'interviewChoice') {
        this._checkSubmit()
          .then(checkResult => {
            if (checkResult) {
              history.push(config.nextRoutePath);
            }
          })
      } else {
        history.push(config.nextRoutePath);
      }
    }
  };

  handleSaveStoreDataByUser = () => {
    const { state } = this.props;
    const userId = state.user.toJS().id;

    userApi.saveStoreDataByUser(userId, window.localStorage.accessToken, {
      personal: state.personal.toJS(),
      apply: state.apply.toJS(),
      interview: state.interview.toJS()
    });

    window.alert(message.TEMPORARY_SAVE)
  };

  _checkSubmit = async () => {
    const { personalActions, applyActions, interviewActions, userActions } = this.props;
    let checkSubmit = false;

    if (window.confirm(message.SUPPORT_CONFIRM)) {
      checkSubmit = await this._submit();
    }

    if (checkSubmit) {
      personalActions.initState();
      applyActions.initState();
      interviewActions.initState();
      userActions.initState();
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
        window.alert(message.BLOCK_BACK_BUTTON);
      };
    }
    return checkSubmit;
  };

  _submit = async () => {
    const { history, state } = this.props;
    const userId = state.user.toJS().id;
    try {
      const sendData = convertModelToSchemaBased({
        personal: state.personal.toJS(),
        apply: state.apply.toJS(),
        interview: state.interview.toJS()
      });
      let isAlreadySubmitted = false;
      const body = await sendData;
      isAlreadySubmitted = await recruitingApi
        .submitRecruiting(userId, window.localStorage.accessToken, body);

      if (isAlreadySubmitted) {
        window.alert(message.ALREADY_SUBMITTED);
        history.push('/');
        return false;
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  _validateByPage = (match, actionModule, { required }) => {
    const { state } = this.props;

    let hasNotValidatedItem = false;

    switch (match.path) {
      case '/personalQuestions':
      case '/applyChoice':
        hasNotValidatedItem = this._validate(actionModule, required);
        return !hasNotValidatedItem;
      case '/interviewChoice':
        const selectedDepartments = state.apply.toJS().applyChoice.map(d => d.department);
        const shouldInterviews = interviewActions.checkInterviewDates(selectedDepartments);
        let hasNotValidatedItem = !shouldInterviews.every((shouldInterview, index) => {
          const timeCount = actionModule.interviewDates[index].times.length;
          const needMoreChoice = (timeCount < 2 && shouldInterview);
          const hasInvalidChoice = (timeCount > 0 && !shouldInterview);

          if (needMoreChoice) {
            window.alert(message.NEED_MORE_INTERVIEW_CHOICE);
          }

          if (hasInvalidChoice) {
            window.alert(message.REMOVE_INVALID_INTERVIEW_CHOICE);
          }
          return !(needMoreChoice || hasInvalidChoice);
        });

        return !hasNotValidatedItem;
      default:
        return !hasNotValidatedItem;
    }
  };

  _validateSingle(actionModule, row) {
    let isValid = true;
    switch (row.checkLevel) {
      case CheckLevelType.VALUE:
        isValid = validation[row.validationType](_.get(actionModule, [...row.key.split('.')]));
        break;
      case CheckLevelType.COMPARE:
        isValid = validation[row.validationType](_.get(actionModule, [...row.key1.split('.')]), _.get(actionModule, [...row.key2.split('.')]));
        break;
      default:
        isValid = false;
        break;
    }
    return isValid;
  }

  _validate = (actionModule, required) => {
    let hasNotValidatedItem;
    return required.find(row => {
      if (row.checkLevel !== CheckLevelType.NESTED) {
        hasNotValidatedItem = !this._validateSingle(actionModule, row);
      } else {
        hasNotValidatedItem = !validation[row.validationType](row.required.map(nested => this._validateSingle(actionModule, nested)));
      }
      if (hasNotValidatedItem) {
        window.alert(row.message);
      }
      return hasNotValidatedItem;
    });
  };

  componentDidMount() {
    const { applyActions } = this.props;
    window.onbeforeunload = function () {
      applyActions.pageRefreshed();
    }.bind(this);
  }

  render() {

    const { pageLayout: LayoutComponent, state } = this.props;
    return (
      <>
        <LayoutComponent
          onNextButtonClick={this.handleNextButtonClick}
          onPreviousButtonClick={this.handlePreviousButtonClick}
          onSaveStoreDataByUser={this.handleSaveStoreDataByUser}
          {...this.props}
        />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    state: state
  }),
  (dispatch) => ({
    personalActions: bindActionCreators(personalActions, dispatch),
    applyActions: bindActionCreators(applyActions, dispatch),
    interviewActions: bindActionCreators(interviewActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),

  })
)(PageContainer));
