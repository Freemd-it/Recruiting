import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const INIT_STATE = 'personal/INIT_STATE';
const LOAD_SAVED_STATE = 'personal/LOAD_SAVED_STATE';
const CHANGE_INPUT = 'personal/CHANGE_INPUT';
const PUSH_INPUT_ARRAY = 'personal/PUSH_INPUT_ARRAY';
const JOIN_KEYS = 'personal/JOIN_KEYS';
const VALIDATE = 'personal/VALIDATE';

export const initState = createAction(INIT_STATE);
export const loadSavedState = createAction(LOAD_SAVED_STATE);
export const changeInput = createAction(CHANGE_INPUT);
export const pushInputArray = createAction(PUSH_INPUT_ARRAY);
export const joinKeys = createAction(JOIN_KEYS);
export const validate = createAction(VALIDATE);

const initialState = fromJS({
  requestConsent: false,
  personalIdentification: {
    englishName: '',
    gender: '',
    birth: {
      year: '',
      month: '',
      date: '',
    },
    birthText: '',
    phoneNumber: {
      first: '010',
      second: '',
      third: '',
    },
    phoneNumberText: '',
    address: '',
    sns: '',
  },
  education: {
    schoolName: ({
      text: '',
      type: '대학교'
    }),
    schoolNameText: '',
    major: '',
    location: '',
    graduationYear: {
      entrance: '',
      graduation: '',
      status: '졸업',
    },
  },
  career: {
    count: '1',
    detailFormat: {
      activityDetail: '',
      durationStart: '',
      durationEnd: '',
      time: '',
      content: '',
    },
    detail: [{
      activityDetail: '',
      durationStart: '',
      durationEnd: '',
      time: '',
      content: '',
    }],
  },
  speciality: {
    count: '1',
    detailFormat: {
      activityDetail: '',
      grade: '',
      content: '',
    },
    detail: [{
      activityDetail: '',
      grade: '',
      content: '',
    }]
  },
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [LOAD_SAVED_STATE]: (state, action) => state = fromJS(action.payload),
  [CHANGE_INPUT]: (state, action) => {
    const keyPath = [...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  },
  [JOIN_KEYS]: (state, action) => {
    const keyPath = [...action.payload.key];
    keyPath[keyPath.length - 1] = `${keyPath[keyPath.length - 1]}Text`;
    return state.setIn(keyPath, Object.values(state.getIn([...action.payload.key]).toJS()).join(action.payload.delimiter || ''));
  },
  [PUSH_INPUT_ARRAY]: (state, action) => {
    return state.setIn([action.payload, 'detail'], state.getIn([action.payload, 'detail']).push(state.getIn([action.payload, 'detailFormat'])))
  },
}, initialState)
