import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import {
  RequestConsentForm,
  PersonalInformation,
  Education,
  Career,
  Speciality
} from '../../components/personalQuestions';

import * as personalActions from '../../modules/personal';
import * as userActions from '../../modules/user';

class PersonalQuestionsContainer extends Component {

  handleInputChange = (name, isSeperated) => event => {
    const { personalActions } = this.props;
    console.log({[name] : event.currentTarget.value});
    personalActions.changeInput({[name] : event.currentTarget.value});

    if (isSeperated) {
      console.log(name.split('.').splice(0, name.split('.').length - 1));
      personalActions.joinKeys(name.split('.').splice(0, name.split('.').length - 1));
    }
  };

  /**
   * 경력, 특기사항 배열 폼 대응 method
   */
  handleInputChangeForArray = name => event => {
    const { personalActions } = this.props;
    console.log(name);
    console.log(event.currentTarget.value);
    personalActions.changeInputArray({[name]: event.currentTarget.value})
  };

  handleButtonChange = (name, value) => {
    const { personalActions } = this.props;
    console.log(name);
    console.log(value);
    personalActions.changeInput({[name] : value});
  };

  handleCheckBoxChange = name => event => {
    const { personalActions } = this.props;
    console.log({[name] : event.currentTarget.checked});
    personalActions.changeInput({[name] : event.currentTarget.checked});

  };


  handleStopPropagation = (e) => {
    e.stopPropagation();
  };


  render() {
    const { personalFields } = this.props;
    return (
      <>
        <RequestConsentForm
          personalFields={personalFields}
          onInputChange={this.handleCheckBoxChange}
          onStopPropagation={this.handleStopPropagation}
        />
        <PersonalInformation
          personalFields={personalFields}
          onInputChange={this.handleInputChange}
          onButtonChange={this.handleButtonChange}
        />
        <Education
          personalFields={personalFields}
          onInputChange={this.handleInputChange}
        />
        <Career
          personalFields={personalFields}
          onInputChange={this.handleInputChangeForArray}
        />
        <Speciality
          personalFields={personalFields}
          onInputChange={this.handleInputChangeForArray}
        />
      </>

    );
  }
}

export default withRouter(connect(
  (state) => ({
    personalFields: state.personal.get('fields').toJS(),
    userFields: state.user.get('fields'),
  }),
  (dispatch) => ({
    personalActions: bindActionCreators(personalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  })
)(PersonalQuestionsContainer));
