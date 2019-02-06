import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import Consts from '../common/consts';
const INIT_STATE = 'apply/INIT_STATE';
const LOAD_SAVED_STATE = 'apply/LOAD_SAVED_STATE';
const TEXT_ANSWER_CHANGED = 'apply/TEXT_ANSWER_CHANGED';
const FILE_ANSWER_CHANGED = 'apply/FILE_ANSWER_CHANGED';
const SELECT_ANSWER_CHANGED = 'apply/SELECT_ANSWER_CHANGED';
const DEPARTMENT_CHOICE_CHANGED = 'apply/DEPARTMENT_CHOICE_CHANGED';
const CHANGE_INPUT = 'apply/CHANGE_INPUT';

export const initState = createAction(INIT_STATE);
export const loadSavedState = createAction(LOAD_SAVED_STATE);
export const textAnswerChanged = createAction(TEXT_ANSWER_CHANGED);
export const fileAnswerChanged = createAction(FILE_ANSWER_CHANGED);
export const selectAnswerChanged = createAction(SELECT_ANSWER_CHANGED);
export const changeInput = createAction(CHANGE_INPUT);
export const departmentChoiceChanged = createAction(DEPARTMENT_CHOICE_CHANGED);

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
      return state.setIn([type, questionClassId, index, answerType], content);
    }
  },
  [FILE_ANSWER_CHANGED]: (state, action) => {
    const { type, index, questionClassId, answerType, file } = action.payload;
    return state.setIn([type, questionClassId, index, answerType], 
      {
        'name': file.name,
        'url': URL.createObjectURL(file)
      });
  },
  [SELECT_ANSWER_CHANGED]: (state, action) => {
    const { type, index, questionClassId, answerType, techName, abilityIndex } = action.payload;
    return state.setIn([type, questionClassId, index, answerType, techName], abilityIndex);
  },
  [CHANGE_INPUT]: (state, action) => {
    const keyPath = [...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  },
  [DEPARTMENT_CHOICE_CHANGED]: (state, action) => {
    const applyChoice = action.payload;
    const questionIds = applyChoice.map(row => Consts.getQuestionClassId(row.department, row.team));
    const departmentQuestions = state.get('department') ? state.get('department').toJS() : {};
    const filteredQuestions = Object.keys(departmentQuestions)
      .filter(key => questionIds.includes(parseInt(key)))
      .reduce((obj, key) => {
        obj[key] = departmentQuestions[key];
        return obj;
      }, {});
    return state.set('department', fromJS(filteredQuestions));
  },
}, initialState);
