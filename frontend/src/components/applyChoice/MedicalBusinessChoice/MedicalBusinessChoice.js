import React from 'react';

import Select from 'react-select';

const colourStyles = {
  control: (provided, state) => ({
    ...provided,
    height: '50px',
    borderRadius: '4px',
    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.16)',
    border: '0.8px inset #5c5959',
    paddingLeft: '16px',
    marginTop: '44px'
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

const MedicalBusinessChoice = (props) => {
  const { applyChoice, departmentDatas, onChoiceSelectBox } = props;
  const choiceIndex = props.isSecondApply ? 1 : 0;
  const selectedDepartment = departmentDatas.find(department =>
    department.name === applyChoice[choiceIndex].department
  );

  let options = [];
  let currentValue = null;
  if (selectedDepartment) {
    const selectedTeam = selectedDepartment.teams.find(team => team.name === applyChoice[choiceIndex].team) 
      || { name: '', medicalOptions: [] };
    options = selectedTeam.medicalOptions.map(row => ({
        value: row,
        label: row,
    }));

    currentValue = {
      value: applyChoice[choiceIndex].medical,
      label: applyChoice[choiceIndex].medical,
    };
  }

  return (
    <>
      <Select
        value={currentValue}
        options={options}
        onChange={(value)=>onChoiceSelectBox(`applyChoice.${choiceIndex}.medical`, value.label)}
        styles={colourStyles}
        isDisabled={!selectedDepartment}
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

export default MedicalBusinessChoice;
