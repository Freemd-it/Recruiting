export const validationType  = {
  CONSENT: 'consent',
  EMAIL: 'email',
  DATE_OF_BIRTH: 'dateOfBirth',
  EMPTY: 'empty',
  PHONE: 'phone',
  GENDER: 'gender',
  YEAR_MONTH: 'yearMonth',
};

export default {
  [validationType.CONSENT]: value => value,
  [validationType.EMAIL]: value => (
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(value)
  ),
  [validationType.DATE_OF_BIRTH]: value => (
    /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(value)
  ),
  [validationType.GENDER]: value => (
    value.length > 0
  ),
  [validationType.EMPTY]: value => (
    value.length > 0
  ),
  [validationType.PHONE]: value => (
    /^\d{3}-\d{3,4}-\d{4}$/.test(value)
  ),
  [validationType.YEAR_MONTH]: value => (
    /^(19|20)\d{2}\/(0[1-9]|1[012])$/.test(value)
  ),
}
