import React from 'react';

import Utils from '../../../common/utils'

import classNames from 'classnames/bind';
import styles from './HeaderInformationText.scss';

const cx = classNames.bind(styles);

const getTitleText = (batch, pageTitleType) => {
  if (pageTitleType === 'default') {
    return {
      customText: `본 서식을 작성하기 앞서 제 ${batch}기 신입 단원\n공개 선발 안내문 필히 숙지해 주시길 바랍니다.`,
      underlineText: ['공개 선발 안내문'],
    }
  } else {
    return {
      customText: `설정하고자 하는 비밀번호를 신중히 입력 후\n지원서를 작성해주세요`,
      enlargeText: ['비밀번호'],
    }
  }
}

const HeaderInformationText = (props) => {
  const { pageTitleType } = props.staticData;
  const { batch } = props;
  let { customText, enlargeText = [], underlineText = [] } = getTitleText(batch, pageTitleType);
  customText = Utils.lineBreak(customText);

  enlargeText.forEach(text => {
    if (customText.indexOf(text) !== -1 ) {
      customText = customText.replace(text, `<span class=${cx('enlarge-text')}>${text}</span>`);
    }
  });

  underlineText.forEach(text => {
    if (customText.indexOf(text) !== -1 ) {
      customText = customText.replace(text, `<span class=${cx('underline-text')}>${text}</span>`)
    }
  });

  return (
    <div className={cx('header-information-text')} dangerouslySetInnerHTML={{__html: customText}}>
    </div>
  );
};

export default HeaderInformationText;
