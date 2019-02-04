import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const INIT_STATE = 'personal/INIT_STATE';
const CHANGE_INPUT = 'personal/CHANGE_INPUT';
const PUSH_INPUT_ARRAY = 'personal/PUSH_INPUT_ARRAY';
const JOIN_KEYS = 'personal/JOIN_KEYS';

export const initState = createAction(INIT_STATE);
export const changeInput = createAction(CHANGE_INPUT);
export const pushInputArray = createAction(PUSH_INPUT_ARRAY);
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
        date: '',
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
      detailFormat: {
        activityType: '인턴',
        activityDetail: '',
        durationStart: '',
        durationEnd: '',
        content: '',
      },
      detail: [{
        activityType: '인턴',
        activityDetail: '',
        durationStart: '',
        durationEnd: '',
        content: '',
      }],
    }),
    speciality: fromJS({
      count: '1',
      detailFormat: {
        activityType: '공인영어',
        activityDetail: '',
        grade: '',
        content: '',
      },
      detail: [{
        activityType: '공인영어',
        activityDetail: '',
        grade: '',
        content: '',
      }]
    })
  })
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [CHANGE_INPUT]: (state, action) => {
    const keyPath = ['fields', ...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  },
  [JOIN_KEYS]: (state, action) => {
    const keyPath = ['fields', ...action.payload];
    keyPath[keyPath.length - 1] = `${keyPath[keyPath.length - 1]}Text`;
    return state.setIn(keyPath, Object.values(state.getIn(['fields', ...action.payload]).toJS()).join(''));
  },
  [PUSH_INPUT_ARRAY]: (state, action) => {
    return state.setIn(['fields', action.payload, 'detail'], state.getIn(['fields', action.payload, 'detail']).push(state.getIn(['fields', action.payload, 'detailFormat'])))
  },
}, initialState)
