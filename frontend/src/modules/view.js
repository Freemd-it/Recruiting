import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const INIT_STATE = 'view/INIT_STATE';
const SET_PREV_VIEW = 'view/SET_PREV_VIEW';
const SET_VIEW = 'view/SET_VIEW';

export const initState = createAction(INIT_STATE);
export const setPrevView = createAction(SET_PREV_VIEW); // prevView, 페이지 접근 체크용
export const setView = createAction(SET_VIEW); // view

const initialState = Map({
  prevView: '',
  view: 'index',
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [SET_PREV_VIEW]: (state, action) => state.set('prevView', action.payload),
  [SET_VIEW]: (state, action) => state.set('view', action.payload),
}, initialState)
