import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import userApi from '../../apis/userApi';
import recruitingApi from '../../apis/recruitingApi';
import ResumeComplete from '../../components/resumeComplete/ResumeComplete';

class ResumeCompleteContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      batch: 0,
      announceDate: ''
    }
  }
  componentDidMount() {
    userApi.getBatch().then(batch => {
      this.setState({ batch });
    });
    recruitingApi.getInterviewInfo()
      .then(info => {
        this.setState({ announceDate: info.announceDate });
      });
  }

  render() {
    const { batch, announceDate } = this.state;

    return (
      <>
        <ResumeComplete 
          batch={batch} 
          announceDate={announceDate}
        />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(ResumeCompleteContainer));
