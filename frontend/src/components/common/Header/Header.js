import React, { Component } from 'react';

import HeaderInformationText from '../HeaderInformationText';

import classNames from 'classnames/bind';
import styles from './Header.scss';
import userApi from '../../../apis/userApi';
import headerImage from '../../../images/header_image.png';

const cx = classNames.bind(styles);

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      batch: 0
    };
  }

  componentDidMount() {
    userApi.getBatch().then(batch => this.setState({ batch }));
  }

  handleMove = () => {
    const { match } = this.props;

    if (match.path !== '/' && window.confirm('로그인 페이지로 이동하시겠습니까?')) {
      this.props.history.push('/');
    }
  };

  render() {
    const { config } = this.props;
    const { batch } = this.state;
    const { showHeaderInformation } = config;

    return (
      <>
      <div className={cx('header-background', 'container-fluid')}>
      </div>
      <header className={cx('header', 'container')} onClick={this.handleMove}>
        <div className={cx('header-text-holder')}>
          <div className={cx('header-text-title')}>RECRUIT</div>
          <span className={cx('header-text')}>{`제 ${batch}기 프리메드 신입 단원 모집`}</span>
        </div>
        <img src={headerImage} className={cx('header-image')} alt=""/>
        { showHeaderInformation && <HeaderInformationText {...this.props} batch={batch} /> }
      </header>
      </>
    );
  }
};

export default Header 