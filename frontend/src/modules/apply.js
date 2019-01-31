import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const INPUT_CHANGED = 'apply/INPUT_CHANGED';

export const inputChanged = createAction(INPUT_CHANGED);

const initialState = fromJS({
  common: {

  }
});

export default handleActions({
  [INPUT_CHANGED]: (state, action) => {
    const { type, index, content } = action.payload;
    return state.setIn([type, index], content);
  }
}, initialState);