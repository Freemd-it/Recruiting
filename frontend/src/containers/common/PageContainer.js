import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { personalActions, applyActions, interviewActions } from '../../reducers'
import validation, { checkLavel } from '../../common/validation';

class PageContainer extends Component {
  //Todo login시 redux 및 스토리지 서버 가져와서 연동.
  componentDidMount() {

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
      history.push(config.nextRoutePath);
    }
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
          window.alert('각 본부에 맞게 인터뷰 날짜를 최소 2개 이상 선정하셔야 합니다.');
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
        case checkLavel.VALUE:
          hasNotValidatedItem = !validation[row.validationType](_.get(actionModule, [...row.key.split('.')]));
          break;
        case checkLavel.COMPARE:
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
