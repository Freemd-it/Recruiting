import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const TEXT_ANSWER_CHANGED = 'apply/TEXT_ANSWER_CHANGED';
const FILE_ANSWER_CHANGED = 'apply/FILE_ANSWER_CHANGED';
const CHANGE_INPUT = 'apply/CHANGE_INPUT';

export const textAnswerChanged = createAction(TEXT_ANSWER_CHANGED);
export const fileAnswerChanged = createAction(FILE_ANSWER_CHANGED);
export const changeInput = createAction(CHANGE_INPUT);

const initialState = fromJS({
  otherAssignConsent: {
    ngo: false,
    medical: false
  },
  isSecondApplyChoice: false,
  applyChoiceFormat: {
    department: '',
    team: '',
    medical: ''
  },
  applyChoice: [
    {
      department: '',
      team: '',
      medical: ''
    },
    {
      department: '',
      team: '',
      medical: ''
    },
  ],
  common: {

  },
  department: {

  }
});

export default handleActions({
  [TEXT_ANSWER_CHANGED]: (state, action) => {
    const { type, index, name, answerType, content } = action.payload;
    if (type === 'common') {
      return state.setIn([type, index], content);
    } else {
      return state.setIn([type, name, index, answerType], content);
    }
  },
  [FILE_ANSWER_CHANGED]: (state, action) => {
    const { type, index, name, answerType, file } = action.payload;
    return state.setIn([type, name, index, answerType, 'name'], file.name);
  },
  [CHANGE_INPUT]: (state, action) => {
    const keyPath = [...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  },
}, initialState);
