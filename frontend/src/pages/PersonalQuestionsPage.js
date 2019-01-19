import React, { Component } from 'react';
import { withPageConfig } from '../hoc';

import PageContainer from '../containers/common/PageContainer';
import { PageCommonTemplate } from '../components/common';
import PersonalQuestionsContainer from '../containers/personalQuestions/PersonalQuestionsContainer';

class PersonalQuestionsPage extends Component {
  render() {
    return (
      <PageContainer pageLayout={PageCommonTemplate} {...this.props}>
        <PersonalQuestionsContainer/>
      </PageContainer>
    );
  }
};

export default withPageConfig('personalQuestions')(PersonalQuestionsPage);
