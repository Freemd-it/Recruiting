import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const TEXT_ANSWER_CHANGED = 'apply/TEXT_ANSWER_CHANGED';
const FILE_ANSWER_CHANGED = 'apply/FILE_ANSWER_CHANGED';
const SELECT_ANSWER_CHANGED = 'apply/SELECT_ANSWER_CHANGED';

export const textAnswerChanged = createAction(TEXT_ANSWER_CHANGED);
export const fileAnswerChanged = createAction(FILE_ANSWER_CHANGED);
export const selectAnswerChanged = createAction(SELECT_ANSWER_CHANGED);

const initialState = fromJS({
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
  [SELECT_ANSWER_CHANGED]: (state, action) => {
    const { type, index, name, answerType, techName, abilityIndex } = action.payload;
    return state.setIn([type, name, index, answerType, techName], abilityIndex);
  }
}, initialState);