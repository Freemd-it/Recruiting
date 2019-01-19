import React, { Component } from 'react';
import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import { withPageConfig } from '../hoc';

class ApplyQuestionsPage extends Component {
  render() {
    return (
      <PageContainer pageLayout={PageCommonTemplate} {...this.props}>
      </PageContainer>
    );
  }
};

export default withPageConfig('applyQuestions')(ApplyQuestionsPage);
