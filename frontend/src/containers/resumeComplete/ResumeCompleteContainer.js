import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import userApi from '../../apis/userApi';
import ResumeComplete from '../../components/resumeComplete/ResumeComplete';

class ResumeCompleteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      batch: 0
    }
  }
  componentDidMount() {
    userApi.getBatch().then(batch => this.setState({ batch }));
  }

  render() {
    const { batch } = this.state;

    return (
      <>
        <ResumeComplete batch={batch} />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    batch: state.user.get('batch')
  }),
  (dispatch) => ({
  })
)(ResumeCompleteContainer));
