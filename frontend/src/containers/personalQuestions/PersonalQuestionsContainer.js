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

  handleInputChange = name => event => {
    const { personalActions } = this.props;
    console.log({[name] : event.currentTarget.value});
    personalActions.changeInput({[name] : event.currentTarget.value});
    if (name.indexOf('.') !== -1) {
      personalActions.joinKeys(name.split('.').splice(0, name.split('.').length - 1));
    }
  };

  handleButtonChange = (name, value) => {
    const { personalActions } = this.props;
    personalActions.changeInput({[name] : value});

  };


  componentDidMount() {
    const { personalFields, personalActions } = this.props;
  }

  render() {
    const { personalFields } = this.props;
    return (
      <>
        <RequestConsentForm/>
        <PersonalInformation
          personalFields={personalFields.toJS()}
          onInputChange={this.handleInputChange}
          onButtonChange={this.handleButtonChange}
        />
        <Education
          personalFields={personalFields}
          onInputChange={this.handleInputChange}
        />
        <Career
          personalFields={personalFields}
          onInputChange={this.handleInputChange}
        />
        <Speciality
          personalFields={personalFields}
          onInputChange={this.handleInputChange}
        />
      </>

    );
  }
}

export default withRouter(connect(
  (state) => ({
    personalFields: state.personal.get('fields'),
    userFields: state.user.get('fields'),
  }),
  (dispatch) => ({
    personalActions: bindActionCreators(personalActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  })
)(PersonalQuestionsContainer));
