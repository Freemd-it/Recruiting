import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from 'react-bootstrap';

import {
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

import {
  FieldGroup,
  FieldGroupWithLabelInlineAndChildren
} from '../../common';

import classNames from 'classnames/bind';
import styles from './SpecialityFormGroup.scss';

const cx = classNames.bind(styles);

const meterialStyles = theme => ({
  formLabelRoot: {
    paddingRight: '45px',
    marginRight: '0px',
    marginBottom: '0px'
  },
  formLabelRootEnd: {
    paddingRight: '0px',
    marginRight: '0px',
    marginBottom: '0px'
  },
  formLabel: {
    fontFamily: `'NotoSans-Light`,
    fontSize: '14px',
  },

  radioRoot: {
    color: '#ff5858',
    '&$checked': {
      color: '#ff5858',
    },
  },
  checked: {},
});

class SpecialityFormGroup extends Component {
  render() {
    const { classes, personalFields, formGroupIndex, onInputChange } = this.props;
    const { activityDetail, grade, content } = personalFields.speciality.detail[formGroupIndex];

    return (
      <>
        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            label='구분'
          >
            <div className={cx('personal-form-holder')}>
              <FieldGroup
                type='text'
                placeholder='공인영어시험/자격증/수상내역/해외연수'
                bsClass='form-control career-speciality-item-2 placeholder-right custom-form'
                value={activityDetail}
                onChange={onInputChange(`speciality.detail.${formGroupIndex}.activityDetail`, false)}
              />
            </div>
          </FieldGroupWithLabelInlineAndChildren>

          
          <FieldGroupWithLabelInlineAndChildren
            label='본인평가'
          >
            <div className={cx('personal-speciality-form-holder')}>
              <RadioGroup
                name="speciality"
                row
                value={grade}
                onChange={onInputChange(`speciality.detail.${formGroupIndex}.grade`, false)}
              >
                <FormControlLabel
                  classes={{root: classes.formLabelRoot, label: classes.formLabel}}
                  value="상"
                  checked={grade === '상'}
                  control={<Radio classes={{root: classes.radioRoot, checked: classes.checked}} />}
                  label="상"
                  labelPlacement="end"
                />
                <FormControlLabel
                  classes={{root: classes.formLabelRoot, label: classes.formLabel}}
                  value="중"
                  checked={grade === '중'}
                  control={<Radio classes={{root: classes.radioRoot, checked: classes.checked}} />}
                  label="중"
                  labelPlacement="end"
                />
                <FormControlLabel
                  classes={{root: classes.formLabelRootEnd, label: classes.formLabel}}
                  value="하"
                  checked={grade === '하'}
                  control={<Radio classes={{root: classes.radioRoot, checked: classes.checked}} />}
                  label="하"
                  labelPlacement="end"
                />
              </RadioGroup>
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>


        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            id='personalInformationForm-career-speciality-text'
            label='상세내역'
            full={true}
          >
            <div className={cx('personal-full-form-holder')}>
              <FormControl
                componentClass='textarea'
                bsClass='form-control custorm-form'
                placeholder='해외의료사업본부 지원자는 영어회화능력(상/중/하) 기재 필수'
                value={content}
                onChange={onInputChange(`speciality.detail.${formGroupIndex}.content`, false)}
              >
              </FormControl>
            </div>
          </FieldGroupWithLabelInlineAndChildren>
        </div>
      </>
    );
  }
};

export default withStyles(meterialStyles)(SpecialityFormGroup);



