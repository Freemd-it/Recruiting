import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { SectionTitle } from '../../components/common';
import { InterviewNotice, TimeSelection, SubmitWarningMessage } from '../../components/interviewChoice';

import recruitingApi from '../../apis/recruitingApi';

import * as interviewActions from '../../modules/interview';

class InterviewChoiceContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      interviewData: [],
    };
  }

  handleCheckedChange = ({day, time, index}) => event => {
    const { interviewActions } = this.props;
    interviewActions.changeChecked({ 
      day, 
      time, 
      index, 
      checked: event.target.checked, 
    });
  };

  componentDidMount() {
    recruitingApi.getInterviewInfo()
      .then(data => {
        this.setState({
          interviewData: Object.entries(data).map(([day, times]) => ({day, times})),
        });
      });
  }


  render() {
    const { checkedFields } = this.props;
    const interviewData = this.state.interviewData;
    return (
      <>
        <SectionTitle title='인터뷰 시간 선택' />
        <InterviewNotice />
        <TimeSelection 
          interviewData={interviewData}
          checkedFields={checkedFields} 
          onCheckedChange={this.handleCheckedChange} 
        />
        <SubmitWarningMessage />
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    checkedFields: state.interview.get('interviewDates').toJS(),
  }),
  (dispatch) => ({
    interviewActions: bindActionCreators(interviewActions, dispatch)
  })
)(InterviewChoiceContainer));
