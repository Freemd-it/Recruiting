import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import './styles/index.scss';

import ResumeLoginPage from './pages/ResumeLoginPage';
import PersonalQuestionsPage from './pages/PersonalQuestionsPage';
import ApplyChociePage from './pages/ApplyChociePage';
import ApplyQuestionsPage from './pages/ApplyQuestionsPage';
import InterviewChoicePage from './pages/InterviewChoicePage';
import ResumeCompletePage from './pages/ResumeCompletePage';
import NotFoundPage from './pages/NotFoundPage';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ResumeLoginPage} />
          <Route path='/personalQuestions' component={PersonalQuestionsPage} />
          <Route path='/applyChoice' component={ApplyChociePage} />
          <Route path='/applyQuestions' component={ApplyQuestionsPage} />
          <Route path='/interviewChoice' component={InterviewChoicePage} />
          <Route path='/resumeComplete' component={ResumeCompletePage} />
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
