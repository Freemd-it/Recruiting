import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { } from '../../components/applyQuestions';
import CommonQuestion from '../../components/applyQuestions/CommonQuestion/CommonQuestion';

import * as applyActions from '../../modules/apply';
import DepartmentQuestion from '../../components/applyQuestions/DepartmentQuestion';

class ApplyQuestionsContainer extends Component {

  handleInputChange = (props) => event => {
    const { applyActions } = this.props;
    const { type, name, answerType, index, techName } = props;
    switch (type) {
      case 'common':
        applyActions.textAnswerChanged({ type, index, content: event.target.value.substring(0, 500) });
        break;
      case 'department':
        switch (answerType) {
          case 'text':
            applyActions.textAnswerChanged({ type, index, name, answerType, content: event.target.value.substring(0, 500) });
            break;
          case 'file':
            applyActions.fileAnswerChanged({ type, index, name, answerType, file: event.target.files[0] });
            break;
          case 'select':
            applyActions.selectAnswerChanged({ type, index, name, answerType, techName, abilityIndex: event.target.value })
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { state } = this.props;
    let questionData = {
        common: [
          '간략한 본인 소개와 함께 프리메드 제 19기 리크루팅에 지원하신 동기를 서술해 주십시오.',
          '이제까지 가장 소속감을 느꼈던 조직은 무엇이었으며, 그 조직의 발전을 위해 헌신적으로 노력했던 것 중 가장 기억에 남는 경험은 무엇입니까?'
        ],
        department: [

        ]
    }
    state.applyChoice.forEach((choice, index) => {
      if (choice.department !== '') {
        questionData.department.push({
          name: `${choice.department}본부 (${choice.team})`,
          rank: index + 1,
          questions: [
            {
              question: '사용할 수 있는 그래픽 툴은 무엇이 있는지 작성해주십시오.(ex- Adobe Photoshop, Adobe illustrator 등등)',
              answerType: 'text'
            },
            {
              question: '지금까지 진행한 작품을 2개 이상 제시해주시고 그 중 마음에 드는 작품과 그 이유를 지원서에 서술해 주십시오.',
              answerType: 'file'
            },
            {
              question: `프리메드에서 디자인적으로 취약한 부분이라고 생각되는 점과 이를 개선하기 위해 
                어떠한 해결책을 제시하고자 하는지 구체적으로 서술해 주십시오. 혹은 문제점과 별개로 
                프리메드에서 진행하고 싶은 사업이 있다면 자유롭게 서술해주십시오.`,
              answerType: 'text'
            }
          ]
        })
      }
    })
    return (
      <>
        <CommonQuestion
          answers={state.common}
          questions={questionData.common}
          onInputChange={this.handleInputChange}
        />
        <DepartmentQuestion
          questionModules={questionData.department}
          answers={state.department}
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
