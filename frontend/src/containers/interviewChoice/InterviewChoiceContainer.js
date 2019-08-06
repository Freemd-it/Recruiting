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

  handleCheckedChange = ({date, time, index}) => event => {
    const { interviewActions } = this.props;
    interviewActions.changeChecked({ 
      date, 
      time, 
      index, 
      checked: event.target.checked, 
    });
  };

  componentDidMount() {
    const { batch } = this.props;
    recruitingApi.getInterviewInfo().then(interviewData => {
      this.setState({ interviewData });
    });

    recruitingApi.getTeamsByDateInfo(batch)
      .then(result => {
        console.log(result);
      });
  }


  render() {
    const { checkedFields, batch } = this.props;
    const interviewData = this.state.interviewData;
    return (
      <>
        <SectionTitle title='인터뷰 시간 선택' />
        <InterviewNotice batch={batch} />
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
    batch: state.user.get('batch')
  }),
  (dispatch) => ({
    interviewActions: bindActionCreators(interviewActions, dispatch)
  })
)(InterviewChoiceContainer));
