import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const INIT_STATE = 'review/INIT_STATE';
const CHANGE_INPUT = 'review/CHANGE_INPUT';

export const initState = createAction(INIT_STATE);
export const changeInput = createAction(CHANGE_INPUT);

const initialState = Map({
  fields: Map({
    name: '',
    email: '',
    password: '',
  })
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [CHANGE_INPUT]: (state, action) => state.set('fields', state.get('fields').merge(Map(action.payload))),
}, initialState)
