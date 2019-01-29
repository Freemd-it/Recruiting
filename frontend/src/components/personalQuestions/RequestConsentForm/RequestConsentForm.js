import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
  Checkbox,
  FormControlLabel,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';

import SubsectionHeader from '../../common/SubsectionHeader';

import classNames from 'classnames/bind';
import styles from './RequestConsentForm.scss';

const cx = classNames.bind({styles});

const meterialStyles = theme => ({
  expansionPanelRoot: {
    boxShadow: '0px 0px',
    borderTop:'1px solid #5c5959',
    borderBottom:'1px solid #5c5959',
    borderRadius: '0px 0px !important',
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
    fontFamily: 'NotoSans-Light',
    fontSize: '16px',
    color: '#707070'
  },
  formControlRoot: {
    marginLeft: '0px',
  },

  expanded: {
    fontFamily: 'NotoSans-Light',
    fontSize: '14px',
    overflow: 'scroll',
    maxHeight: '300px',
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
              <br/>
              <strong className={cx('expand-panel-text-center')}>비영리민간의료단체 프리메드는(이하 프리메드) 신입 단원 선발을 위해 참고할 개인 정보를 수집하고 있습니다.</strong><br/><br/>
              <strong className={cx('expand-panel-text-title')}>1. 수집하는 개인정보 항목</strong><br/>
              - 이름, 주소, 전화번호, 이메일 주소, 휴대폰 번호를 비롯하여 ‘비영리민간의료단체 프리메드 제 19기 신입 단원 공개 선발 지원 서식’ 에 포함된 모든 정보<br/><br/>
              <strong className={cx('expand-panel-text-title')}>2. 개인정보 수집 방법</strong><br/>
              - 프리메드는 지원자가 직접 ‘비영리민간의료단체 프리메드 제 19기 신입 단원 공개 선발 지원 서식’에<br/>
              작성하고 동의한 정보에 한해서만 수집하며, 모든 지원서를 프리메드 공식 리크루팅 계정 recruiting19th@freemed.or.kr을 통해 수집하고 있습니다.<br/><br/>
              <strong className={cx('expand-panel-text-title')}>3. 개인정보 수집 및 이용 목적</strong><br/>
              - 프리메드 제 19기 신입 단원 공개 선발 시 인터뷰 대상자 선발 및 최종 수습 단원 선발을 위한 참고 자료<br/>
              - 제 19기 신입 단원 공개 선발 기간 마감 후 추가 합격자 선발을 위한 참고 자료<br/>
              - 제 19기 신입 단원 공개 선발 내부 통계 (지원자의 성별/전공/지원 일시 등) 작성 및 분석을 위한 자료<br/><br/>
              <strong className={cx('expand-panel-text-title')}>4. 개인정보 보유 및 이용기간</strong><br/>
              - 프리메드 공식 리크루팅 계정 recruiting19th@freemed.or.kr에 수집된 지원서는 프리메드 제 19기 신입 단원 공개 선발 운영사무국 운영진에게만 공개되며, 이용 목적 달성 후 파기됩니다.<br/><br/>
              <strong className={cx('expand-panel-text-title')}>5. 개인 정보 제 3자 제공 안내</strong><br/>
              - 프리메드는 수집된 정보를 제 3자에게 제공하지 않습니다.<br/>
              <br/>
              동의를 거부할 수 있으며, 동의 거부 시 프리메드 제 19기 신입 단원 공개 선발 과정에서 일부 불이익이 있을 수 있습니다.<br/>
              <br/><strong className={cx('expand-panel-text-center', 'expand-panel-text-title')}>「개인정보보호법」 등 관련 법규에 의거하여 상기 본인은 위와 같이 개인정보 수집 및 활용에 동의합니다.</strong><br/>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
};

export default withStyles(meterialStyles)(RequestConsentForm);



