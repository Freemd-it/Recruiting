import React, { Component } from 'react';
import { withPageConfig } from '../hoc';

import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import ResumeCompleteContainer from '../containers/resumeComplete/ResumeCompleteContainer';

class ResumeCompletePage extends Component {
  render() {
    return (
      <PageContainer pageLayout={PageCommonTemplate} {...this.props}>
        <ResumeCompleteContainer/>
      </PageContainer>
    );
  }
};

export default withPageConfig('resumeComplete')(ResumeCompletePage);
