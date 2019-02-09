import { createAction, handleActions } from 'redux-actions';
<<<<<<< HEAD
import { fromJS, removeIn, setIn } from 'immutable';
import Consts from '../common/consts';
import * as _ from 'lodash';

=======
import { fromJS } from 'immutable';
import Consts from '../common/consts';
>>>>>>> 6fad396fea84cb1c8894faf825bcdcb0fa40d49b
const INIT_STATE = 'apply/INIT_STATE';
const LOAD_SAVED_STATE = 'apply/LOAD_SAVED_STATE';
const TEXT_ANSWER_CHANGED = 'apply/TEXT_ANSWER_CHANGED';
const FILE_ANSWER_CHANGED = 'apply/FILE_ANSWER_CHANGED';
const SELECT_ANSWER_CHANGED = 'apply/SELECT_ANSWER_CHANGED';
const DEPARTMENT_CHOICE_CHANGED = 'apply/DEPARTMENT_CHOICE_CHANGED';
const CHANGE_INPUT = 'apply/CHANGE_INPUT';
const PAGE_REFRESHED = 'apply/PAGE_REFRESHED';

export const initState = createAction(INIT_STATE);
export const loadSavedState = createAction(LOAD_SAVED_STATE);
export const textAnswerChanged = createAction(TEXT_ANSWER_CHANGED);
export const fileAnswerChanged = createAction(FILE_ANSWER_CHANGED);
export const selectAnswerChanged = createAction(SELECT_ANSWER_CHANGED);
export const changeInput = createAction(CHANGE_INPUT);
export const departmentChoiceChanged = createAction(DEPARTMENT_CHOICE_CHANGED);
<<<<<<< HEAD
export const pageRefreshed = createAction(PAGE_REFRESHED);
=======
>>>>>>> 6fad396fea84cb1c8894faf825bcdcb0fa40d49b

const initialState = fromJS({
  otherAssignConsent: {
    ngo: false,
    medical: false,
  },
  isSecondApplyChoice: false,
  applyChoiceFormat: {
    department: '',
    team: '',
    medical: '',
  },
  applyChoice: [
    {
      department: '',
      team: '',
      medical: '',
    },
    {
      department: '',
      team: '',
      medical: '',
    },
  ],
  common: {

  },
  department: {

  },
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [LOAD_SAVED_STATE]: (state, action) => state = fromJS(action.payload),
  [TEXT_ANSWER_CHANGED]: (state, action) => {
    const { type, index, questionClassId, answerType, content } = action.payload;
    if (type === 'common') {
      return state.setIn([type, index], content);
    } else {
<<<<<<< HEAD
      return fromJS(setIn(state.toJS(), [type, questionClassId, index, answerType], content));
=======
      return state.setIn([type, questionClassId, index, answerType], content);
>>>>>>> 6fad396fea84cb1c8894faf825bcdcb0fa40d49b
    }
  },
  [FILE_ANSWER_CHANGED]: (state, action) => {
    const { type, index, questionClassId, answerType, file } = action.payload;
<<<<<<< HEAD
    const url = URL.createObjectURL(file);
    let updated = setIn(state.toJS(), [type, questionClassId, index, answerType], 
=======
    return state.setIn([type, questionClassId, index, answerType], 
>>>>>>> 6fad396fea84cb1c8894faf825bcdcb0fa40d49b
      {
        'name': file.name,
        'url': url,
      });
    return fromJS(setIn(updated, [type, 'files', `${questionClassId}.${index}.file`], url))
  },
  [SELECT_ANSWER_CHANGED]: (state, action) => {
    const { type, index, questionClassId, answerType, techName, abilityIndex } = action.payload;
<<<<<<< HEAD
    return fromJS(setIn(state.toJS(), [type, questionClassId, index, answerType, techName], abilityIndex));
=======
    return state.setIn([type, questionClassId, index, answerType, techName], abilityIndex);
>>>>>>> 6fad396fea84cb1c8894faf825bcdcb0fa40d49b
  },
  [CHANGE_INPUT]: (state, action) => {
    const keyPath = [...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  },
  [DEPARTMENT_CHOICE_CHANGED]: (state, action) => {
    const applyChoice = action.payload;
    const questionIds = applyChoice.map(row => Consts.getQuestionClassId(row.department, row.team));
<<<<<<< HEAD
    const files = state.get('department').get('files') ? state.get('department').get('files').toJS() : {};
    const filteredFiles = Object.keys(files)
      .filter(key => questionIds.includes(parseInt(key.split('.')[0])))
      .reduce((obj, key) => ({...obj, [key]: files[key]}), {});

    let updated = state.setIn(['department', 'files'], fromJS(filteredFiles));
    questionIds.push('files');
    const departmentQuestions = updated.get('department') ? updated.get('department').toJS() : {};
    const filteredQuestions = Object.keys(departmentQuestions)
      .filter(key => questionIds.includes(key) || questionIds.includes(parseInt(key)))
      .reduce((obj, key) => ({...obj, [key]: departmentQuestions[key]}), {});

    return updated.set('department', fromJS(filteredQuestions));
  },
  [PAGE_REFRESHED]: (state, action) => {
    const files = state.getIn(['department', 'files']).toJS();
    let updated = state.toJS();
    updated = setIn(updated, ['department', 'files'], {});
    Object.keys(files).forEach(key => {
      let keyPath = ['department'].concat(key.split('.'));
      keyPath[1] = parseInt(keyPath[1]);
      keyPath[2] = parseInt(keyPath[2]);
      updated = removeIn(updated, keyPath);
    });
    return fromJS(updated);
=======
    const departmentQuestions = state.get('department') ? state.get('department').toJS() : {};
    const filteredQuestions = Object.keys(departmentQuestions)
      .filter(key => questionIds.includes(parseInt(key)))
      .reduce((obj, key) => {
        obj[key] = departmentQuestions[key];
        return obj;
      }, {});
    return state.set('department', fromJS(filteredQuestions));
>>>>>>> 6fad396fea84cb1c8894faf825bcdcb0fa40d49b
  },
}, initialState);
