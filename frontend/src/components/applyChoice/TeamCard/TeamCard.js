import React from 'react';

import Utils from '../../../common/utils';

import classNames from 'classnames/bind';
import styles from './TeamCard.scss';

const cx = classNames.bind(styles);

const TeamCard = ({ data, image }) => {
  return (
    <div className={cx('team-card-item')}>
      <img src={image}/>
      <div className={cx('team-card-name')}><span>{data.name}</span></div>
      <div className={cx('team-card-description')} dangerouslySetInnerHTML={{__html: `<span>${Utils.lineBreak(data.description)}</span>`}}/>
    </div>
  );
}

export default TeamCard;
