import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const INIT_STATE = 'personal/INIT_STATE';
const CHANGE_INPUT = 'personal/CHANGE_INPUT';
const JOIN_KEYS = 'personal/JOIN_KEYS';

export const initState = createAction(INIT_STATE);
export const changeInput = createAction(CHANGE_INPUT);
export const joinKeys = createAction(JOIN_KEYS);

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
    birthText: '',
    phoneNumber: Map({
      first: '010',
      second: '',
      third: '',
    }),
    phoneNumberText: '',
    address: '',
    email: Map({
      text: '',
      type: ''
    }),
    emailText: '',
    sns: '',
    education: Map({
      schoolName: Map({
        text: '',
        type: '대학교'
      }),
      schoolType: '',
      major: '',
      location: '',
      graduationYear: Map({
        entrance: '',
        graduation: '',
        status: '졸업',
      }),
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
  [CHANGE_INPUT]: (state, action) => {


    if (Object.keys(action.payload)[0].indexOf('.') !== -1) {
      const rootFields = Object.keys(action.payload)[0].split('.')[0];
      const keyArr = Object.keys(action.payload)[0].split('.').reverse();
      const keyDepth = keyArr.length;

      let customPayload = {[keyArr[0]]: Object.values(action.payload)[0]};
      keyArr.splice(1, keyDepth - 2).forEach(item => {
        customPayload = {[item]: customPayload};
      });
      return state.set('fields', state.get('fields').mergeDeep(fromJS({[rootFields]: customPayload})));
    }
    return state.set('fields', state.get('fields').merge(Map(action.payload)))
  },
  [JOIN_KEYS]: (state, action) => {
    console.log(action.payload);
    return state.set('fields', state.get('fields').merge(fromJS({[`${action.payload[0]}Text`]: Object.values(state.get('fields').getIn(action.payload).toJS()).join('')})));
  }

}, initialState)
