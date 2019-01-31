import React from 'react';

import TeamCard from '../TeamCard';

import classNames from 'classnames/bind';
import styles from './NGOBusinessChoice.scss';
import images from '../../../images';

const cx = classNames.bind(styles);

const NGOBusinessChoice = (props) => {
  const { applyBusinessData } = props;

  return (
    <>
      <div className={cx('team-card-holder')}>

        {applyBusinessData.map((dataRow, dataIndex) => (
            <TeamCard key={`TeamCard__${dataIndex}`} data={dataRow} image={images[dataRow.imageName]}/>
          ))
        }

      </div>
      <div className={cx('team-choice')}>

      </div>
    </>
  );
}

export default NGOBusinessChoice;
