import { ValidationType } from './types';

export default {
  [ValidationType.CONSENT]: value => value,
  [ValidationType.EMAIL]: value => (
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(value)
  ),
  [ValidationType.DATE_OF_BIRTH]: value => (
    /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(value)
  ),
  [ValidationType.GENDER]: value => (
    value.length > 0
  ),
  [ValidationType.EMPTY]: value => (
    value.length > 0
  ),
  [ValidationType.PHONE]: value => (
    /^\d{3}-\d{3,4}-\d{4}$/.test(value)
  ),
  [ValidationType.YEAR_MONTH]: value => (
    /^(19|20)\d{2}\/(0[1-9]|1[012])$/.test(value)
  ),
  [ValidationType.NOT_EQUAL]: (value1, value2) => (
    value1 !== value2
  ),
  [ValidationType.OR]: (values) => (
    values.reduce((prev, curr) => prev || curr, false)
  ),
  [ValidationType.AND]: (values) => (
    values.reduce((prev, curr) => prev && curr, false)
  ),

}
