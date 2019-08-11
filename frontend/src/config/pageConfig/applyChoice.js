import { CheckLevelType, ValidationType } from '../../common/types';

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
      checkLevel: CheckLevelType.VALUE,
    }, {
      key: 'applyChoice.0.medical_field',
      message: '의료 사업을 선택해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLevel: CheckLevelType.VALUE,
    }, {
      checkLevel: CheckLevelType.NESTED,
      message: '1,2지망 다른 NGO 본부나, 같은 본부 내에서 다른 팀을 선택해 주세요.',
      validationType: ValidationType.OR,
      required: [
        {
          key1: 'applyChoice.0.team',
          key2: 'applyChoice.1.team',
          message: '1,2지망 다른 NGO 사업 팀을 선택해 주세요.',
          validationType: ValidationType.NOT_EQUAL,
          checkLevel: CheckLevelType.COMPARE,
        },
        {
          key1: 'applyChoice.0.department',
          key2: 'applyChoice.1.department',
          message: '1,2지망 다른 NGO 사업 본부를 선택해 주세요.',
          validationType: ValidationType.NOT_EQUAL,
          checkLevel: CheckLevelType.COMPARE,
        }
      ]
    }],
  },
}
