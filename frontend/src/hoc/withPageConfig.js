import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import pageStaticData from '../common/pageStaticData';

import pageConfig from '../config/pageConfig';

const withPageConfig = (pageConfigName) => (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          config={pageConfig[pageConfigName]}
          staticData={pageStaticData[pageConfigName]}
          {...this.props}
        />
      )
    }
  }
}

export default withPageConfig;
