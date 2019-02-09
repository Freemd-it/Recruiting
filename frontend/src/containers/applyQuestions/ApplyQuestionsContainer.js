import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { } from '../../components/applyQuestions';

import * as applyActions from '../../modules/apply';
import recruitingApi from '../../apis/recruitingApi';
import Consts from '../../common/consts';
import message from '../../common/message';

import CommonQuestion from '../../components/applyQuestions/CommonQuestion';
import DepartmentQuestion from '../../components/applyQuestions/DepartmentQuestion';

class ApplyQuestionsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionData: {
        common: [

        ],
        department: [

        ],
      },
    };
  }

  handleInputChange = (props) => event => {
    const { applyActions } = this.props;
    const { type, questionClassId, answerType, index, techName } = props;
    switch (type) {
      case 'common':
        applyActions.textAnswerChanged({ type, index, content: event.target.value.substring(0, 500) });
        break;
      case 'department':
        switch (answerType) {
          case 'text':
            applyActions.textAnswerChanged({ type, index, questionClassId, answerType, content: event.target.value.substring(0, 500) });
            break;
          case 'file':
            if (event.target.files[0].size > 1048576 * 10) {
              window.alert(message.EXCEED_FILE_CAPACITY);
              break;
            }
            applyActions.fileAnswerChanged({ type, index, questionClassId, answerType, file: event.target.files[0] });
            break;
          case 'select':
            applyActions.selectAnswerChanged({ type, index, questionClassId, answerType, techName, abilityIndex: event.target.value });
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    const { state, applyActions } = this.props;
    recruitingApi.getQuestionInfo(state.applyChoice.map(row => Consts.getQuestionClassId(row.department, row.team)))
      .then(data => {
        let questionData = {
          common: data.common.map(row => row.question),
          department: [],
        };
        state.applyChoice.forEach((choice, index) => {
          const questionKey = index == 0 ? 'first' : 'second';
          if (choice.department !== '') {
            questionData.department.push({
              department: choice.department,
              team: choice.team,
              questionClassId: Consts.getQuestionClassId(choice.department, choice.team),
              rank: index + 1,
              questions: data[questionKey].map(row => ({question: row.question, answerType: 'text' })),
            })
          }
        })
        this.setState({questionData});
      });
    applyActions.departmentChoiceChanged(state.applyChoice);
  }

  render() {
    const { state } = this.props;
    const questionData = this.state.questionData;
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
