import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { personalActions, applyActions, interviewActions } from '../../reducers'
import { checkLavelType } from '../../common/types';
import validation from '../../common/validation';

import message from '../../common/message';
import userApi from '../../apis/userApi'
import recruitingApi, { convertModelToSchemaBased } from '../../apis/recruitingApi'

class PageContainer extends Component {

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
        this._submit();
      }

      history.push(config.nextRoutePath);
    }
  };

  _submit = () => {
    const { state } = this.props;
    const userId = state.user.toJS().id;

    userApi.saveStoreDataByUser(userId, window.localStorage.accessToken, {
      personal: state.personal.toJS(),
      apply: state.apply.toJS(),
      interview: state.interview.toJS()
    });


    recruitingApi.submitRecruiting(userId, window.localStorage.accessToken, convertModelToSchemaBased({
      personal: state.personal.toJS(),
      apply: state.apply.toJS(),
      interview: state.interview.toJS()
    }))
  };


  _validateByPage = (match, actionModule, { required }) => {
    const { state } = this.props;

    let hasNotValidatedItem = false;

    switch(match.path) {
      case '/personalQuestions':
      case '/applyChoice':
        hasNotValidatedItem = this._validate(actionModule, required);
        return !hasNotValidatedItem;
      case '/interviewChoice':
        const selectedDepartments = state.apply.toJS().applyChoice.map(d => d.department);
        const shouldInterviews = interviewActions.checkInterviewDates(selectedDepartments);
        let hasNotValidatedItem = !shouldInterviews.every((shouldInterview, index) => {
          let timeCount = actionModule.interviewDates[index].times.length;
          return (timeCount >= 2 || !shouldInterview) && (timeCount === 0 || shouldInterview)
        });
        if (hasNotValidatedItem) {
          window.alert(message.interviewChoice);
        }
        return !hasNotValidatedItem;

      default:
        return !hasNotValidatedItem;
    }
  };

  _validate = (actionModule, required) => {
    let hasNotValidatedItem;
    return required.find(row => {
      switch(row.checkLavel) {
        case checkLavelType.VALUE:
          hasNotValidatedItem = !validation[row.validationType](_.get(actionModule, [...row.key.split('.')]));
          break;
        case checkLavelType.COMPARE:
          hasNotValidatedItem = !validation[row.validationType](_.get(actionModule, [...row.key1.split('.')]), _.get(actionModule, [...row.key2.split('.')]));
          break;
        default:
          hasNotValidatedItem = false;
          break;
      }
      if (hasNotValidatedItem) {
        window.alert(row.message);
      }
      return hasNotValidatedItem;
    });
  };

  render() {
    const { pageLayout: LayoutComponent } = this.props;

    return (
      <>
        <LayoutComponent
          onNextButtonClick={this.handleNextButtonClick}
          onPreviousButtonClick={this.handlePreviousButtonClick}
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

  })
)(PageContainer));
