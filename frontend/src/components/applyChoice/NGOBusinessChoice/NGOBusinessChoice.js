import React from 'react';

import Select from 'react-select';
import TeamCard from '../TeamCard';

import classNames from 'classnames/bind';
import styles from './NGOBusinessChoice.scss';

const cx = classNames.bind(styles);

const colourStyles = {
  control: (provided, state) => ({
    ...provided,
    height: '50px',
    borderRadius: '4px',
    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.16)',
    border: '0.8px inset #5c5959',
    paddingLeft: '16px',
    marginTop: '80px'
  }),
  option: (provided, { isDisabled, isFocused }) => {
    return {
      ...provided,
      paddingLeft: '24px',
      backgroundColor: isDisabled ?  '#f8f8f8' : isFocused ? '#ff5858' : '#ffffff',
      color: isFocused ? '#ffffff' : '#5c5959',
      cursor: isDisabled ? 'not-allowed' : 'default',
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.16)',
      height:'50px',
      display: 'flex',
      alignItems: 'center',
    };
  },
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transition: 'all .2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null
  })
};

const NGOBusinessChoice = (props) => {
  const { applyChoice, departmentDatas, onChoiceNGOBusiness, onChoiceSelectBox } = props;
  const choiceIndex = props.isSecondApply ? 1 : 0;
  const selectedDepartment = departmentDatas.find(department =>
    department.departmentName === applyChoice[choiceIndex].department
  );

  const options = selectedDepartment && selectedDepartment.teams.length > 0
    ? selectedDepartment.teams.map(row => (
      {
        value: row.teamName,
        label: row.teamName === '약무팀' ? '약무팀 (약대생만 선발)' : row.teamName
      }))
    : [ {value: '팀 없음', label: '팀 없음'} ];

  const currentTeam = selectedDepartment ? {
      value: applyChoice[choiceIndex].team || selectedDepartment.teams[0].teamName,
      label: applyChoice[choiceIndex].team || selectedDepartment.teams[0].teamName,
  } : null;

  return (
    <>
      <div className={cx('team-card-holder')}>

        {departmentDatas.map((row, index) => (
            <TeamCard
              key={`TeamCard__${index}`}
              data={row}
              image={row.departmentImageUrl}
              selected={applyChoice[choiceIndex].department === row.departmentName}
              isSeconApply={props.isSecondApply}
              onChoiceNGOBusiness={onChoiceNGOBusiness}
            />
          ))
        }
      </div>

      <Select
        value={currentTeam}
        options={options}
        styles={colourStyles}
        onChange={(value) => onChoiceSelectBox(`applyChoice.${choiceIndex}.team`, value.value)}
        isDisabled={!selectedDepartment || options[0].label === '팀 없음'}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          borderStyle: '2px',
          colors: {
            ...theme.colors,
            primary: '#ff5858',
            primary25: '#ff5858',
            primary50: '#ff5858',
          },
        })}
      />
    </>
  );
}

export default NGOBusinessChoice;
