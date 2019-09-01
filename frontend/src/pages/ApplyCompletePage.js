import React, { Component } from 'react';
import { withPageConfig } from '../hoc';

import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import ApplyCompleteContainer from '../containers/applyComplete/ApplyCompleteContainer';

class ApplyCompletePage extends Component {
  render() {
    return (
      <PageContainer pageLayout={PageCommonTemplate} {...this.props}>
        <ApplyCompleteContainer/>
      </PageContainer>
    );
  }
};

export default withPageConfig('resumeComplete')(ApplyCompletePage);
