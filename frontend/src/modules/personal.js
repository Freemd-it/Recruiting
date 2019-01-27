import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const INIT_STATE = 'personal/INIT_STATE';
const CHANGE_INPUT = 'personal/CHANGE_INPUT';
const CHANGE_INPUT_ARRAY = 'personal/CHANGE_INPUT_ARRAY';
const JOIN_KEYS = 'personal/JOIN_KEYS';

export const initState = createAction(INIT_STATE);
export const changeInput = createAction(CHANGE_INPUT);
export const changeInputArray = createAction(CHANGE_INPUT_ARRAY);
export const joinKeys = createAction(JOIN_KEYS);

const initialState = Map({
  fields: Map({
    requestConsent: 'false',
    personalIdentification: Map({
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
    }),
    education: Map({
      schoolName: Map({
        text: '',
        type: '대학교'
      }),
      schoolNameText: '',
      major: '',
      location: '',
      graduationYear: Map({
        entrance: '',
        graduation: '',
        status: '졸업',
      }),
    }),
    career: fromJS({
      count: '1',
      detail: [{
        activityType: '인턴',
        activityDetail: '',
        durationStart: '',
        durationEnd: '',
        content: ''
      },{
        activityType: '인턴',
        activityDetail: '',
        durationStart: '',
        durationEnd: '',
        content: ''
      }]
    }),
    speciality: fromJS({
      count: '1',
      detail: [{
        activityType: '공인영어',
        activityDetail: '',
        grade: '',
        content: ''
      },{
        activityType: '공인영어',
        activityDetail: '',
        grade: '',
        content: ''
      }]
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
  [CHANGE_INPUT_ARRAY]: (state, action) => {
    const keyPath = ['fields', ...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  },
  [JOIN_KEYS]: (state, action) => {
    const keyPath = ['fields', ...action.payload];
    keyPath[keyPath.length - 1] = `${keyPath[keyPath.length - 1]}Text`;
    return state.setIn(keyPath, Object.values(state.getIn(['fields', ...action.payload]).toJS()).join(''));
  }
}, initialState)
