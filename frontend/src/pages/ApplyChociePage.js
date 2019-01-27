import React, { Component } from 'react';
import { withPageConfig } from '../hoc';

import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import ApplyChoiceContainer from '../containers/applyChoice/ApplyChoiceContainer';

class ApplyChociePage extends Component {
  render() {
    return (
      <PageContainer pageLayout={PageCommonTemplate} {...this.props}>
        <ApplyChoiceContainer />
      </PageContainer>
    );
  }
};

export default withPageConfig('applyChoice')(ApplyChociePage);
