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
  const { applyChoice, departmentDatas, medicalAllOptions, onChoiceSelectBox } = props;

  const selectedDepartment = departmentDatas.find(department =>
    department.name === (props.isSecondApply ? applyChoice[1].department : applyChoice[0].department)
  );

  const options = medicalAllOptions.map(dataRow => ({
      value: dataRow,
      label: dataRow,
      isDisabled: selectedDepartment && selectedDepartment.medicalOptions.indexOf(dataRow) === -1
  }));

  const currentValue = {
    value: applyChoice[props.isSecondApply ? 1 : 0].medical,
    label: applyChoice[props.isSecondApply ? 1 : 0].medical,
  };


  return (
    <>
      <Select
        value={!selectedDepartment ? null : currentValue}
        options={options}
        onChange={(value)=>onChoiceSelectBox(`applyChoice.${props.isSecondApply ? 1 : 0}.medical`, value.label)}
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
