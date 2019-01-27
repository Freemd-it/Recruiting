import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import SubsectionHeader from '../../common/SubsectionHeader';

import classNames from 'classnames/bind';
import styles from './RequestConsentForm.scss';

const cx = classNames.bind({styles});

const meterialStyles = theme => ({
  expansionPanelRoot: {
    fontFamily: `'Noto Sans KR', sans-serif`,
    boxShadow: '0px 0px',
    borderTop:'1px solid #5c5959',
    borderBottom:'1px solid #5c5959',
    borderRadius: '0px 0px 0px 0px',
    minHeight: '40px',
    width: '100%'
  },
  expansionPanelExpanded: {
    marginTop: '0px !important',
    witdh: '100% !important'
  },

  summaryPanelRoot: {
    margin: '0px 0px 0px 0px',
    padding: '0px 0px 0px 0px',
    minHeight: '40px',
  },

  summaryPanelContent: {
    margin: '0px 0px 0px 0px',
    minHeight: '40px'
  },

  summaryPanelExpandIcon: {
    transform: 'translateY(-50%) !important',

  },

  summaryPanelExpanded: {
    minHeight: '40px !important',
    margin: '0px !important',
  },

  summaryPannelDetail: {
    overflow: 'auto !important'
  },

  formControlLabel: {
    fontFamily: `'Noto Sans KR', sans-serif`,
    fontSize: '16px',
    fontWeight: '300',
    opacity: '0.8',
    color: '#707070'
  },
  formControlRoot: {
    marginLeft: '0px',
  },

  expanded: {
    overflow: 'scroll',
    maxHeight: '200px',
    fontFamily:`'Noto Sans KR', sans-serif`,
  },
  checkBoxRoot: {
    color: '#ff5858',
    '&$checked': {
      color: '#ff5858',
    }
  },
  checked: {},
});

class RequestConsentForm extends Component {
  render() {
    const { classes, personalFields, onInputChange, onStopPropagation } = this.props;
    const { requestConsent } = personalFields;


    return (
      <div className={cx('consent-form')}>
        <SubsectionHeader title='개인 정보 수집 및 약관' noDivider={true} />
        <ExpansionPanel classes={{root: classes.expansionPanelRoot, expanded: classes.expansionPanelExpanded}}>
          <ExpansionPanelSummary classes={{root: classes.summaryPanelRoot,
            content: classes.summaryPanelContent,
            expanded: classes.summaryPanelExpanded,
            expandIcon: classes.summaryPanelExpandIcon,
            }} expandIcon={<u>자세히</u>}>
            <FormControlLabel
              onClick={onStopPropagation}
              classes={{root: classes.formControlRoot, label: classes.formControlLabel}}
              control={
                <Checkbox
                  classes={{root: classes.checkBoxRoot, checked:classes.checked}}
                  checked={requestConsent === true}
                  onChange={onInputChange('requestConsent', false)}
                />
              }
              label='개인 정보 수집 및 약관 동의'
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails >
            <Typography classes={{root: classes.expanded}}>
              바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개
              바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보<br/><br/><br/>
              똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개바보 똥개
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
};

export default withStyles(meterialStyles)(RequestConsentForm);



