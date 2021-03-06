import React from 'react';

import Utils from '../../../common/utils';

import classNames from 'classnames/bind';
import styles from './TeamCard.scss';

const cx = classNames.bind(styles);

const TeamCard = ({ data, image, selected, isSeconApply, onChoiceNGOBusiness}) => {
  return (
    <div className={!selected ? cx('team-card-item') : cx('team-card-item', 'selected')}
         onClick={() => onChoiceNGOBusiness(`applyChoice.${isSeconApply ? 1 : 0}.department`, data.departmentName)}>
      <img src={image} alt=""/>
      <div className={cx('team-card-name')}>
        <span>
          {data.departmentName.substring(0, data.departmentName.length - 2)}
        </span>
      </div>
      <div className={cx('team-card-description')} 
        dangerouslySetInnerHTML={{__html: `
          <span>
            ${Utils.lineBreak(data.departmentDescription)}
          </span>`}}
      />
    </div>
  );
}

export default TeamCard;
