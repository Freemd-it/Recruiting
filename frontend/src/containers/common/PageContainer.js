import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { personalActions, applyActions, interviewActions } from '../../reducers'
import validation from '../../common/validation';

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
    const validateResult = this.validateByPage(match, actionModule, config.validation);

    if (validateResult) {
      history.push(config.nextRoutePath);
    }
  };

  validateByPage = (match, actionModule, { required }) => {
    const { state } = this.props;
    switch (match.path) {
      case '/personalQuestions':
        const hasNotValidatedItem = required.find(row => {
          if (!validation[row.validationType](_.get(actionModule, ['fields', ...row.key.split('.')]))) {
            window.alert(row.message);
            return true;
          }
        });
        return !hasNotValidatedItem;
      case '/applyChoice':
        return true;
      case '/interviewChoice':
        const selectedDepartments = state.apply.toJS().applyChoice.map(d => d.department);
        console.log({selectedDepartments});
        const shouldInterviews = interviewActions.checkInterviewDates(selectedDepartments);
        console.log({shouldInterviews});
        let validate = true;
        shouldInterviews.forEach((shouldInterview, index) => {
          let timeCount = actionModule.interviewDates[index].times.length;
          if ((timeCount < 2 && shouldInterview) || (timeCount > 0 && !shouldInterview)) {
            validate = false;
          }
        });
        if (!validate) {
          window.alert('각 본부에 맞게 인터뷰 날짜를 최소 2개 이상 선정하셔야 합니다.');
        }
        return validate;
      default:
        return true;
    }
  };

  render() {
    const { pageLayout: LayoutComponent } = this.props;

    return (
      <>
        <LayoutComponent onNextButtonClick={this.handleNextButtonClick} onPreviousButtonClick={this.handlePreviousButtonClick} {...this.props} />
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
