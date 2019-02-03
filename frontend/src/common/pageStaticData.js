// page static data
export default {
  resumeLogin: {
  },
  personalQuestions: {
  },
  applyChoice: {
    applyBusinessData: [
      {
        name: '경영지원',
        description: '내부 행사 진행 업무 주관',
        teams: ['인사조직팀', '재무관리팀', '기획지원팀'],
        medicalOptions: ['무료진료소', '보건교육'],
        imageName: 'businessImage'
      },
      {
        name: '브랜드마케팅',
        description: '대외협력 업무 주관',
        teams: ['대외협력팀', '후원전략팀', '홍보기획팀'],
        medicalOptions: ['무료진료소', '보건교육'],
        imageName: 'marketingImage'
      },
      {
        name: '디자인',
        description: '단체의 시각적\n정체성을 구축',
        teams: [],
        medicalOptions: ['무료진료소', '보건교육', '참여안함'],
        imageName: 'designImage'
      },
      {
        name: 'IT기획',
        description: '소외계층 환자 관리 등\n소프웨어를 기획, 개발',
        teams: [],
        medicalOptions: ['무료진료소', '참여안함'],
        imageName: 'itImage'
      },
      {
        name: '무료진료소사업',
        description: '무료진료소사업 내부\n물적 자원 및 인력 관리',
        teams: ['진료소운영팀', '의무기록팀', '약무팀(약대생만 선발)'],
        medicalOptions: ['무료진료소'],
        imageName: 'clinicImage'
      },
      {
        name: '보건교육사업',
        description: '보건교사업 컨텐츠\n개발 및  프로그램 역량강화',
        teams: ['인사조직팀', '재무관리팀', '기획지원팀'],
        medicalOptions: ['보건교육'],
        imageName: 'eduImage'
      },
      {
        name: '해외의료사업',
        description: '해외의료사업\n총 운영 업무 주관',
        teams: ['인사조직팀', '재무관리팀', '기획지원팀'],
        medicalOptions: ['해외의료'],
        imageName: 'overseasImage'
      }
    ],
    medicalModal: {
      fullText: `무료진료소사업본부는 무료진료소, 보건교육사업은 보건의료, 해외의료본부는 해외의료 사업으로만 참여하실 수 있습니다.\n디자인본부와 IT본부는 의료 사업이 필수 참여가 아니며,  그 외 본부는 무료진료소사업과 보건교육사업 택 1 필수입니다.`,
      enlargeText: ['무료진료소사업본부', '무료진료소', '보건교육사업', '보건의료', '해외의료본부', '해외의료', '디자인본부와 IT본', '필수 참여가 아니며', '긔 외 본부', '무료진료소사업과 보건교육사업 택 1 필수'],
    }
  },
  applyQuestions: {
  },
  interviewChoice: {
  },
  resumeComplete: {
  }
}
