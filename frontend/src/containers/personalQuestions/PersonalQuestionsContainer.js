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
    const { personaActions } = this.props;
    personaActions.changeInput({[name] : event.target.value});
  };


  componentDidMount() {
    const { personalFields, personaActions } = this.props;
  }


  render() {
    const { personalFields } = this.props;

    return (
      <>
        <RequestConsentForm/>
        <PersonalInformation
          personalFields={personalFields}
          onInputChange={this.handleInputChange}
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
