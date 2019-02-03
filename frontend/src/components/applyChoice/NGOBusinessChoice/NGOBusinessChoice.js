import React from 'react';

import { FormControl } from 'react-bootstrap';

import TeamCard from '../TeamCard';

import images from '../../../images';
import classNames from 'classnames/bind';
import styles from './NGOBusinessChoice.scss';

const cx = classNames.bind(styles);

const NGOBusinessChoice = (props) => {
  const { applyChoiceFields, applyDepartmentData, onChoiceNGOBusiness } = props;

  return (
    <>
      <div className={cx('team-card-holder')}>

        {applyDepartmentData.map((dataRow, dataIndex) => (
            <TeamCard
              key={`TeamCard__${dataIndex}`}
              data={dataRow}
              image={images[dataRow.imageName]}
              selected={!props.isSecondApply ? applyChoiceFields[0].department === dataRow.name : applyChoiceFields[1].department === dataRow.name}
              isSeconApply={props.isSecondApply}
              onChoiceNGOBusiness={onChoiceNGOBusiness}
            />
          ))
        }

      </div>
      <div>
        <select className={cx('team-choice-select')}>
          <option>셀렉트박스</option>
          <option>옵션1</option>
          <option>옵션2</option>
          <option>옵션3</option>
        </select>
      </div>
    </>
  );
}

export default NGOBusinessChoice;
