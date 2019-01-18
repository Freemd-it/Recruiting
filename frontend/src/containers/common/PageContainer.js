import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

class PageContainer extends Component {
  //페이지 인가 처리용
  componentDidMount() {
    const { match, view } = this.props;

    // baseActions.setPrevView(view);
    // baseActions.setView(currentViewName === '' ? 'index' : currentViewName);
  }

  render() {
    const { layout: LayoutComnent } = this.props;

    return (
      <>
        <LayoutComnent {...this.props}/>
      </>
    );
  }
}

export default withRouter(connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(PageContainer));
