import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FieldGroup from '../../common/Form/FieldGroup';
import FieldGroupWithLabelInlineAndChildren from '../../common/Form/FieldGroupWithLabelInlineAndChildren';

import classNames from 'classnames/bind';
import styles from './Speciality.scss';
import SubsectionHeader from '../../common/SubsectionHeader';

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

class PersonalInformation extends Component {
  render() {
    const { classes, personalFields, onInputChange } = this.props;
    const { activityType, activityDetail, grade, content } = personalFields.speciality;

    return (
      <div className={cx('personal-form')}>
        <SubsectionHeader title='특기사항' />

        <div className={cx('form-row')}>
          <FieldGroupWithLabelInlineAndChildren
            label='활동구분'
          >
            <div className={cx('personal-form-holder')}>
              <FormControl
                componentClass='select'
                bsClass='form-control career-speciality-item-1 custorm-form'
                value={activityType}
                onChange={onInputChange('speciality.activityType', false)}
              >
                <option value='공인영어'> 공인영어 </option>
              </FormControl>
              <FieldGroup
                type='text'
                placeholder="공인영어시험명"
                bsClass='form-control career-speciality-item-2 placeholder-right custom-form'
                value={activityDetail}
                onChange={onInputChange('speciality.activityDetail', false)}
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
                onChange={onInputChange('speciality.grade', false)}
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
                value={content}
                onChange={onInputChange('speciality.content', false)}
              >
              </FormControl>
            </div>

          </FieldGroupWithLabelInlineAndChildren>
        </div>
      </div>
    );
  }
};

export default withStyles(meterialStyles)(PersonalInformation);



