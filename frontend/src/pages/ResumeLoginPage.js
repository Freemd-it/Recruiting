import React, { Component } from 'react';
import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import ResumeLoginContainer from '../containers/resumeLogin/ResumeLoginContainer';
import { withPageConfig } from '../hoc'

class ResumeLoginPage extends Component {
  render() {
    return (
      <>
        <PageContainer pageLayout={PageCommonTemplate} {...this.props}>
          <ResumeLoginContainer/>
        </PageContainer>
      </>
    );
  }
};

export default withPageConfig('resumeLogin')(ResumeLoginPage);
