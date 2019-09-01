import { CheckLevelType, ValidationType } from '../../common/types';

export default {
  pageType: 'personalQuestions',
  showHeaderInformation: true,
  showStepSection: true,
  showNextSection: true,
  showTemporarySaveButton: true,
  nextRoutePath: '/applyChoice',
  previousRoutePath: '/',
  validationModuleKey: 'personal',
  validation: {
    required: [{
      key: 'requestConsent',
      message: '개인 정보를 동의해주세요.',
      validationType: ValidationType.CONSENT,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'personalIdentification.englishName',
      message: '영어 이름을 입력해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'personalIdentification.gender',
      message: '성별 체크를 해주세요.',
      validationType: ValidationType.GENDER,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'personalIdentification.birthText',
      message: '생년월일을 정확히 입력해 주세요.(ex: 2001 01 01)',
      validationType: ValidationType.DATE_OF_BIRTH,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'personalIdentification.phoneNumberText',
      message: '휴대폰 번호를 정확히 입력해 주세요.',
      validationType: ValidationType.PHONE,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'personalIdentification.address',
      message: '주소를 입력해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'education.schoolName.text',
      message: '학교명을 입력해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'education.schoolNameText',
      message: '학교명을 입력해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'education.major',
      message: '전공/계열을 입력해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'education.location',
      message: '소재지를 입력해 주세요.',
      validationType: ValidationType.EMPTY,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'education.graduationYear.entrance',
      message: '입학 년월을 정확히 입력해 주세요.(ex: 2001/01)',
      validationType: ValidationType.YEAR_MONTH,
      checkLevel: CheckLevelType.VALUE,
    },{
      key: 'education.graduationYear.graduation',
      message: '졸업 년월을 정확히 입력해 주세요.(ex: 2001/01)',
      validationType: ValidationType.YEAR_MONTH,
      checkLevel: CheckLevelType.VALUE,
    },{
      arrayKey: 'career.detail',
      valueKey: 'time',
      message: '경력 시간 부분에 숫자만 입력해주세요.(ex: 200)',
      validationType: ValidationType.CAREER_TIME,
      checkLevel: CheckLevelType.ARRAY,
    },
    {
      arrayKey: 'career.detail',
      valueKey: 'durationStart',
      message: '경력 활동 시작 년월을 정확히 입력해 주세요.(ex: 2019/09)',
      validationType: ValidationType.YEAR_MONTH,
      checkLevel: CheckLevelType.ARRAY,
    },
    {
      arrayKey: 'career.detail',
      valueKey: 'durationEnd',
      message: '경력 활동 종료 년월을 정확히 입력해 주세요.(ex: 2019/09)',
      validationType: ValidationType.YEAR_MONTH,
      checkLevel: CheckLevelType.ARRAY,
    },
  ]
  }
}
