import React from 'react';

import Utils from '../../../common/utils'

import classNames from 'classnames/bind';
import styles from './HeaderInformationText.scss';

const cx = classNames.bind(styles);

const HeaderInformationText = (props) => {
  let { fullText: customText, enlargeText =[],  underlineText=[] } = props.staticData;
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
