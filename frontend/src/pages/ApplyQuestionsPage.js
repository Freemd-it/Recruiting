import React, { Component } from 'react';
import { withPageConfig } from '../hoc';

import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import ApplyQuestionsContainer from '../containers/applyQuestions/ApplyQuestionsContainer';

class ApplyQuestionsPage extends Component {
  render() {
    return (
      <PageContainer pageLayout={PageCommonTemplate} {...this.props}>
        <ApplyQuestionsContainer />
      </PageContainer>
    );
  }
};

export default withPageConfig('applyQuestions')(ApplyQuestionsPage);
