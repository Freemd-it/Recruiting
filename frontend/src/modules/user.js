import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const INIT_STATE = 'user/INIT_STATE';
const CHANGE_INPUT = 'user/CHANGE_INPUT';

export const initState = createAction(INIT_STATE);
export const changeInput = createAction(CHANGE_INPUT);

const initialState = fromJS({
  name: '',
  email: '',
  password: '',
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [CHANGE_INPUT]: (state, action) => {
    const keyPath = [...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  }
}, initialState)
