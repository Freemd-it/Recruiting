import React, { Component } from 'react';
import pageConfig from '../config/pageConfig';

const withPageConfig = (pageConfigName) => (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent config={pageConfig[pageConfigName]} {...this.props} />
      )
    }
  }
}

export default withPageConfig;