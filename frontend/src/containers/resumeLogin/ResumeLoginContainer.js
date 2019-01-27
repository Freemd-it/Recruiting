import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

import { LoginForm } from '../../components/resumeLogin';

import * as userActions from '../../modules/user';

class ResumeLoginContainer extends Component {

  handleInputChange = name => event => {
    const { userActions } = this.props;
    userActions.changeInput({[name] : event.target.value});
  };

  handleSubmit = e => {
    /**
     * login post 요청, 만약 있으면 바로 넘어감
     */
    // axios.post('/api/login');

    this.props.history.push('/personalQuestions');
  };

  render() {
    const { userFields } = this.props;
    return (
      <>
        <LoginForm
          userFields={userFields}
          onInputChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    userFields: state.user.get('fields'),
  }),
  (dispatch) => ({
    userActions: bindActionCreators(userActions, dispatch),
  })
)(ResumeLoginContainer));

