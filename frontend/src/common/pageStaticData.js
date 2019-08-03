
const GENERATION_NUMBER = 21;
const defaultPageTitle = {
  fullText: `본 서식을 작성하기 앞서 제 ${GENERATION_NUMBER}기 신입 단원\n공개 선발 안내문 필히 숙지해 주시길 바랍니다.`,
  underlineText: ['공개 선발 안내문'],
};

const loginPageTitle = {
  fullText: `설정하고자 하는 비밀번호를 신중히 입력 후\n지원서를 작성해주세요`,
  enlargeText: ['비밀번호'],
};

// page static data
export default {
  generation: GENERATION_NUMBER,
  resumeLogin: {
    ...loginPageTitle,
  },
  personalQuestions: {
    ...defaultPageTitle,
  },
  applyChoice: {
    ...defaultPageTitle,
    departmentDatas: [
      {
        name: '경영지원본부',
        description: '내부 운영 총괄\n및 사업 지원',
        teams: [
          { name: '인사조직팀', medicalOptions: ['무료진료소', '보건교육'] },
          { name: '재무관리팀', medicalOptions: ['무료진료소', '보건교육'] },
          { name: '기획지원팀', medicalOptions: ['무료진료소', '보건교육'] },
          { name: '통계팀', medicalOptions: ['무료진료소', '보건교육'] },
          { name: 'IT기획팀', medicalOptions: ['무료진료소'] }
        ],
        imageName: 'businessImage',
      },
      {
        name: '브랜드마케팅본부',
        description: '대외협력 업무 주관',
        teams: [
          { name: '대외협력팀', medicalOptions: ['무료진료소', '보건교육'] },
          { name: '후원전략팀', medicalOptions: ['무료진료소', '보건교육'] },
          { name: '홍보기획팀', medicalOptions: ['무료진료소', '보건교육'] },
          { name: '디자인팀', medicalOptions: ['무료진료소', '보건교육']}
        ],
        imageName: 'marketingImage',
      },
      {
        name: '무료진료소사업본부',
        description: '무료진료소사업 내부\n물적 자원 및 인력 관리',
        teams: [
          { name: '진료소운영팀', medicalOptions: ['무료진료소'] },
          { name: '약무팀', medicalOptions: ['무료진료소'] }
        ],
        imageName: 'clinicImage',
      },
      {
        name: '보건교육사업본부',
        description: '보건교사업 컨텐츠\n개발 및  프로그램 역량강화',
        teams: [
          { name: '공통', medicalOptions: ['보건교육'] }
        ],
        imageName: 'eduImage',
      },
      {
        name: '해외의료사업본부',
        description: '해외의료사업\n 기획 및 시행',
        teams: [
          { name: '공통', medicalOptions: ['해외의료'] }
        ],
        imageName: 'overseasImage',
      }
      // {
      //   name: '디자인본부',
      //   description: '단체의 시각적\n정체성을 구축',
      //   teams: [],
      //   medicalOptions: ['무료진료소', '보건교육', '참여안함'],
      //   imageName: 'designImage',
      // },
      // {
      //   name: 'IT기획본부',
      //   description: '소외계층 환자 관리 등\n소프웨어를 기획, 개발',
      //   teams: [],
      //   medicalOptions: ['무료진료소', '참여안함'],
      //   imageName: 'itImage',
      // },
    ],
    medicalModalMessage: {
      fullText: `무료진료소사업본부는 무료진료소, 보건교육사업본부는 보건교육, 해외의료사업본부는 해외의료 사업으로만 참여하실 수 있습니다.\n디자인본부와 IT기획본부는 의료 사업이 필수 참여가 아니며,  그 외 본부는 무료진료소사업과 보건교육사업 택1 필수입니다.`,
      enlargeText: ['무료진료소사업본부', '무료진료소', '보건교육사업본부', '보건의료', '해외의료사업본부', '해외의료', '디자인본부와 IT기획본부', '필수 참여가 아니며', '그 외 본부', '택1 필수'],
    },
    medicalAllOptions: ['무료진료소', '보건교육', '해외의료', '참여안함'],
  },
  applyQuestions: {
    ...defaultPageTitle,
  },
  interviewChoice: {
    ...defaultPageTitle,
    firstDayDepartments: ['디자인본부', 'IT기획본부', '해외의료사업본부'],
    secondDayDepartments: ['경영지원본부', '브랜드마케팅본부', '무료진료소사업본부', '보건교육사업본부'],
  },
  resumeComplete: {
    ...defaultPageTitle,
  }
}
