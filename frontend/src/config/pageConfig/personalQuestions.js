import { checkLavelType, validationType } from '../../common/types';

export default {
  pageType: 'personalQuestions',
  showHeaderInformation: true,
  showStepSection: true,
  showNextSection: true,
  nextRoutePath: '/applyChoice',
  previousRoutePath: '/',
  validationModuleKey: 'personal',
  validation: {
    required: [{
      key: 'requestConsent',
      message: '개인 정보를 동의해주세요.',
      validationType: validationType.CONSENT,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'personalIdentification.name',
      message: '이름을 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'personalIdentification.englishName',
      message: '영어 이름을 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'personalIdentification.gender',
      message: '성별 체크를 해주세요.',
      validationType: validationType.GENDER,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'personalIdentification.birthText',
      message: '생년월일을 정확히 입력해 주세요.(ex: 2001 01 01)',
      validationType: validationType.DATE_OF_BIRTH,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'personalIdentification.phoneNumberText',
      message: '휴대폰 번호를 정확히 입력해 주세요.',
      validationType: validationType.PHONE,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'personalIdentification.address',
      message: '주소를 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    }, {
      key: 'personalIdentification.email.text',
      message: '이메일을 정확히 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'personalIdentification.emailText',
      message: '이메일을 정확히 입력해 주세요.',
      validationType: validationType.EMAIL,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'education.schoolName.text',
      message: '학교명을 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'education.schoolNameText',
      message: '학교명을 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'education.major',
      message: '전공/계열을 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'education.location',
      message: '소재지를 입력해 주세요.',
      validationType: validationType.EMPTY,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'education.graduationYear.entrance',
      message: '입학 년월을 정확히 입력해 주세요.(ex: 2001/01)',
      validationType: validationType.YEAR_MONTH,
      checkLavel: checkLavelType.VALUE,
    },{
      key: 'education.graduationYear.graduation',
      message: '졸업 년월을 정확히 입력해 주세요.(ex: 2001/01)',
      validationType: validationType.YEAR_MONTH,
      checkLavel: checkLavelType.VALUE,
    }]
  }
}
