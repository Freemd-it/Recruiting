import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const INIT_STATE = 'personal/INIT_STATE';
const CHANGE_INPUT = 'personal/CHANGE_INPUT';

export const initState = createAction(INIT_STATE);
export const changeInput = createAction(CHANGE_INPUT);

const initialState = Map({
  fields: Map({
    name: '',
    englishName: '',
    gender: '',
    birth: Map({
      year: '',
      month: '',
      date: ''
    }),
    phoneNumber: Map({
      first: '',
      second: '',
      third: '',
    }),
    address: '',
    email: Map({
      text: '',
      type: ''
    }),
    sns: '',
    education: Map({
      schoolName: '',
      schoolType: '',
      major: '',
      location: '',
      entrance: '',
      graduation: '',
      status: '',
    }),
    career: Map({
      division: '',
      divisionText: '',
      duration: '',
      content: ''
    }),
    speciality: Map({
      division: '',
      divisionText: '',
      grade: '',
      content: ''
    })
  })
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [CHANGE_INPUT]: (state, action) => state.set('fields', state.get('fields').merge(Map(action.payload))),
}, initialState)
