import { CheckLavelType, ValidationType } from '../../common/types';

export default {
  pageType: 'applyChoice',
  showHeaderInformation: true,
  showStepSection: true,
  showPreviousSection: true,
  showNextSection: true,
  showTemporarySaveButton: true,
  nextRoutePath: '/applyQuestions',
  previousRoutePath: '/personalQuestions',
  validationModuleKey: 'apply',
  validation: {
    required: [{
      key: 'applyChoice.0.department',
      message: 'NGO 사업 부서를 선택해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLavel: CheckLavelType.VALUE,
    },{
      key: 'applyChoice.0.medical',
      message: '의료 산업을 선택해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLavel: CheckLavelType.VALUE,
    },{
      key1: 'applyChoice.0.department',
      key2: 'applyChoice.1.department',
      message: '1,2지망 다른 NGO 사업 부서를 선택해 주세요.',
      validationType: ValidationType.NOT_EQUAL,
      checkLavel: CheckLavelType.COMPARE,
    }],
  },
}
