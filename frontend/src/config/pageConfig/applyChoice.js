import { validationType } from '../../common/validation';

export default {
  pageType: 'applyChoice',
  showHeaderInformation: true,
  showStepSection: true,
  showPreviousSection: true,
  showNextSection: true,
  nextRoutePath: '/applyQuestions',
  previousRoutePath: '/personalQuestions',
  validationModuleKey: 'apply',
  validation: {
    required: [{
      key: 'applyChoice.0.department',
      message: 'NGO 사업 부서를 선택해 주세요.',
      validationType: validationType.EMPTY,
    },{
      key: 'applyChoice.0.team',
      message: 'NGO 사업 팀을 선택해 주세요.',
      validationType: validationType.EMPTY,
    },{
      key: 'applyChoice.0.medical',
      message: '의료 산업을 선택해 주세요.',
      validationType: validationType.EMPTY,
    },{
      key: 'applyChoice.0.medical',
      message: '1,2지망 다른 NGO 사업 부서를 선택해 주세요.',
      validationType: validationType.EMPTY,
    }],
  },
}
