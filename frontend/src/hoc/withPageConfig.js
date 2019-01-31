import React, { Component } from 'react';

import pageStaticData from '../common/pageStaticData';
import message from '../common/message';

import pageConfig from '../config/pageConfig';

const withPageConfig = (pageConfigName) => (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <WrappedComponent
          config={pageConfig[pageConfigName]}
          messageConfig={message[pageConfigName]}
          staticData={pageStaticData[pageConfigName]}
          {...this.props}
        />
      )
    }
  }
}

export default withPageConfig;
