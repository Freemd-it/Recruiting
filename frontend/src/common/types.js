const SupportStatusType = {
  PROCEEDING: 200,
  EVALUATING: 201,
  PASS: 202,
  FAIL: 203,
  HOLDING: 204,
};

const CheckLevelType = {
  VALUE: 'value',
  ARRAY: 'array',
  COMPARE: 'compare',
  NESTED: 'nested',
};

const ValidationType  = {
  CONSENT: 'consent',
  CAREER_TIME: 'careerTime',
  EMAIL: 'email',
  DATE_OF_BIRTH: 'dateOfBirth',
  EMPTY: 'empty',
  PHONE: 'phone',
  GENDER: 'gender',
  YEAR_MONTH: 'yearMonth',
  NOT_EQUAL: 'notEqual',
  OR: 'or',
  AND: 'and',
};

export {
  SupportStatusType,
  CheckLevelType,
  ValidationType
}
