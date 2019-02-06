import React, { Component } from 'react';
import { withPageConfig } from '../hoc';

import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import InterviewChoiceContainer from '../containers/interviewChoice/InterviewChoiceContainer';

class InterviewChoicePage extends Component {
  render() {
    return (
      <PageContainer pageLayout={ PageCommonTemplate } {...this.props}>
        <InterviewChoiceContainer/>
      </PageContainer>
    );
  }
};

export default withPageConfig('interviewChoice')(InterviewChoicePage);
