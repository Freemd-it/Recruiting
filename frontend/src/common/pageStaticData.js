import { validationType } from './validation';

const defaultPageTitle = {
  fullText: `본 서식을 작성하기 앞서 제 20기 신입 단원\n공개 선발 안내문 필히 숙지해 주시길 바랍니다.`,
  underlineText: ['공개 선발 안내문'],
};

const loginPageTitle = {
  fullText: `설정하고자 하는 비밀번호를 신중히 입력 후\n지원서를 작성해주세요`,
  enlargeText: ['비밀번호'],
};

// page static data
export default {
  resumeLogin: {
    ...loginPageTitle,
  },
  personalQuestions: {
    ...defaultPageTitle,
    validation: {
      required: [{
        name: 'requestConsent',
        message: '개인 정보를 동의해주세요.',
        validationType: validationType.CONSENT,
      },{
        name: 'personalIdentification.name',
        message: '이름을 입력해 주세요.',
        validationType: validationType.EMPTY,
      },{
        name: 'personalIdentification.englishName',
        message: '영어 이름을 입력해 주세요.',
        validationType: validationType.EMPTY,
      },{
        name: 'personalIdentification.gender',
        message: '성별 체크를 해주세요.',
        validationType: validationType.GENDER,
      },{
        name: 'personalIdentification.birthText',
        message: '생년월일을 정확히 입력해 주세요.(ex: 2001 01 01)',
        validationType: validationType.DATE_OF_BIRTH,
      },{
        name: 'personalIdentification.phoneNumberText',
        message: '휴대폰 번호를 정확히 입력해 주세요.',
        validationType: validationType.PHONE,
      },{
        name: 'personalIdentification.address',
        message: '주소를 입력해 주세요.',
        validationType: validationType.EMPTY,
      },{
        name: 'personalIdentification.emailText',
        message: '이메일을 정확히 입력해 주세요.',
        validationType: validationType.EMAIL,
      },{
        name: 'education.schoolNameText',
        message: '학교명을 입력해 주세요.',
        validationType: validationType.EMPTY
      },{
        name: 'education.major',
        message: '계열을 입력해 주세요.',
        validationType: validationType.EMPTY
      },{
        name: 'education.location',
        message: '소재지를 입력해 주세요.',
        validationType: validationType.EMPTY
      },{
        name: 'education.graduationYear.entrance',
        message: '입학 년월을 정확히 입력해 주세요.(ex: 2001/01)',
        validationType: validationType.YEAR_MONTH
      },{
        name: 'education.graduationYear.graduation',
        message: '졸업 년월을 정확히 입력해 주세요.(ex: 2001/01)',
        validationType: validationType.YEAR_MONTH
      }]
    }
  },
  applyChoice: {
    ...defaultPageTitle,
    departmentDatas: [
      {
        name: '경영지원',
        description: '내부 행사 진행 업무 주관',
        teams: ['인사조직팀', '재무관리팀', '기획지원팀'],
        medicalOptions: ['무료진료소', '보건교육'],
        imageName: 'businessImage',
      },
      {
        name: '브랜드마케팅',
        description: '대외협력 업무 주관',
        teams: ['대외협력팀', '후원전략팀', '홍보기획팀'],
        medicalOptions: ['무료진료소', '보건교육'],
        imageName: 'marketingImage',
      },
      {
        name: '디자인',
        description: '단체의 시각적\n정체성을 구축',
        teams: ['팀 없음'],
        medicalOptions: ['무료진료소', '보건교육', '참여안함'],
        imageName: 'designImage',
      },
      {
        name: 'IT기획',
        description: '소외계층 환자 관리 등\n소프웨어를 기획, 개발',
        teams: ['팀 없음'],
        medicalOptions: ['무료진료소', '참여안함'],
        imageName: 'itImage',
      },
      {
        name: '무료진료소사업',
        description: '무료진료소사업 내부\n물적 자원 및 인력 관리',
        teams: ['진료소운영팀', '의무기록팀', '약무팀(약대생만 선발)'],
        medicalOptions: ['무료진료소'],
        imageName: 'clinicImage',
      },
      {
        name: '보건교육사업',
        description: '보건교사업 컨텐츠\n개발 및  프로그램 역량강화',
        teams: ['보건교운영팀', '교육연구팀'],
        medicalOptions: ['보건교육'],
        imageName: 'eduImage',
      },
      {
        name: '해외의료사업',
        description: '해외의료사업\n총 운영 업무 주관',
        teams: ['팀 없음'],
        medicalOptions: ['해외의료'],
        imageName: 'overseasImage',
      }
    ],
    medicalModalMessage: {
      fullText: `무료진료소사업본부는 무료진료소, 보건교육사업은 보건의료, 해외의료본부는 해외의료 사업으로만 참여하실 수 있습니다.\n디자인본부와 IT본부는 의료 사업이 필수 참여가 아니며,  그 외 본부는 무료진료소사업과 보건교육사업 택 1 필수입니다.`,
      enlargeText: ['무료진료소사업본부', '무료진료소', '보건교육사업', '보건의료', '해외의료본부', '해외의료', '디자인본부와 IT본', '필수 참여가 아니며', '긔 외 본부', '무료진료소사업과 보건교육사업 택 1 필수'],
    },
    medicalAllOptions: ['무료진료소', '보건교육', '해외의료', '참여안함'],
  },
  applyQuestions: {
    ...defaultPageTitle,
  },
  interviewChoice: {
    ...defaultPageTitle,
    firstDayDepartments: ['디자인', 'IT기획', '해외의료사업'],
    secondDayDepartments: ['경영지원', '브랜드마케팅', '무료진료소사업', '보건교육사업'],
  },
  resumeComplete: {
    ...defaultPageTitle,
  }
}
