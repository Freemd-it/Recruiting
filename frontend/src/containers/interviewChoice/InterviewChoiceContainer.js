import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { SectionTitle } from '../../components/common';
import { InterviewNotice, TimeSelection } from '../../components/interviewChoice';

import * as interviewActions from '../../modules/interview';

class InterviewChoiceContainer extends Component {

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
  }

  render() {
    const { checkedFields } = this.props;
    return (
      <>
        <SectionTitle title='인터뷰 시간 선택' />
        <InterviewNotice />
        <TimeSelection checkedFields={checkedFields} onCheckedChange={this.handleCheckedChange} />
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
