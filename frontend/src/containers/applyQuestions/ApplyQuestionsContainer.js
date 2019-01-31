import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { } from '../../components/applyQuestions';
import CommonQuestion from '../../components/applyQuestions/CommonQuestion/CommonQuestion';

import * as applyActions from '../../modules/apply';

class ApplyQuestionsContainer extends Component {

  handleInputChange = (type, index) => event => {
    const { applyActions } = this.props;
    applyActions.inputChanged({ type, index, content: event.target.value.substring(0, 500) })
  };

  render() {
    const { state } = this.props;
    const questionData = {
      common: [
        '간략한 본인 소개와 함께 프리메드 제 19기 리크루팅에 지원하신 동기를 서술해 주십시오.',
        '이제까지 가장 소속감을 느꼈던 조직은 무엇이었으며, 그 조직의 발전을 위해 헌신적으로 노력했던 것 중 가장 기억에 남는 경험은 무엇입니까?'
      ]
    }
    return (
      <>
        <CommonQuestion 
          answers={state.common} 
          commonQuestions={questionData.common} 
          onInputChange={this.handleInputChange}
        />
      </>

    );
  }
}

export default withRouter(connect(
  (state) => ({
    state: state.apply.toJS()
  }),
  (dispatch) => ({
    applyActions: bindActionCreators(applyActions, dispatch)
  })
)(ApplyQuestionsContainer));
