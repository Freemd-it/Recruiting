import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { } from '../../components/applyQuestions';

import * as applyActions from '../../modules/apply';
import recruitingApi from '../../apis/recruitingApi';
import message from '../../common/message';

import CommonQuestion from '../../components/applyQuestions/CommonQuestion';
import DepartmentQuestion from '../../components/applyQuestions/DepartmentQuestion';

class ApplyQuestionsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionData: {
        common: [],
        department: [],
      },
    };
  }

  handleInputChange = (props) => event => {
    const { applyActions } = this.props;
    const { type, questionKey, answerType, index, techName } = props;
    switch (type) {
      case 'common':
        applyActions.textAnswerChanged({ type, index, content: event.target.value.substring(0, 500) });
        break;
      case 'department':
        switch (answerType) {
          case 'text':
            applyActions.textAnswerChanged({ type, index, questionKey, answerType, content: event.target.value.substring(0, 500) });
            break;
          case 'file':
            if (event.target.files[0].size > 1048576 * 10) {
              window.alert(message.EXCEED_FILE_CAPACITY);
              break;
            }
            applyActions.fileAnswerChanged({ type, index, questionKey, answerType, file: event.target.files[0] });
            break;
          case 'select':
            applyActions.selectAnswerChanged({ type, index, questionKey, answerType, techName, abilityIndex: event.target.value });
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
    applyActions.departmentChoiceChanged(state.applyChoice);
    recruitingApi.getQuestionInfo(state.applyChoice)
      .then(data => {
        const questionData = {
          common: [],
          department: []
        };

        const commonData = data.common[0].questions.map(row => ({ question: row.content, type: row.type }));
        applyActions.answerFormatInit({ type: 'common', data: commonData });
        questionData.common = commonData.map(d => d.question);

        state.applyChoice.forEach((choice, index) => {
          const applyChoiceKey = index === 0 ? 'first' : 'second';
          if (choice.department !== '') {
            const questions = data[applyChoiceKey].reduce((acc, curr) => {
              return acc.concat(curr.questions.map(question => {
                const { type, content } = question;
                return { 
                  question: content,
                  answerType: type,
                  isTeamQuestion: curr.teamName !== '공통' 
                }
              }))
            }, []);

            const departmentData = questions.map(elem => ({ question: elem.question, type: elem.answerType }));
            const questionKey = `${choice.department}_${choice.team}`;
            applyActions.answerFormatInit({ type: 'department', key: `${choice.department}_${choice.team}`, data: departmentData });
            questionData.department.push({
              department: choice.department,
              team: choice.team,
              rank: index + 1,
              questions,
              questionKey,
            })
          }
        });
        this.setState({ questionData });
      });
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
