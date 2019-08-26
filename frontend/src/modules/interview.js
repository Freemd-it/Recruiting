import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import * as staticData from '../common/pageStaticData';

const INIT_STATE = 'interview/INIT_STATE';
const INIT_DATE = 'interview/INIT_DATE';
const LOAD_SAVED_STATE = 'interview/LOAD_SAVED_STATE';
const CHANGE_CHECKED = 'interview/CHANGE_CHECKED';
const VALIDATE = 'interview/VALIDATE';
const UPDATE_TEAMS_BY_DATE_INFO = 'interview/UPDATE_TEAMS_BY_DATE_INFO';

export const initState = createAction(INIT_STATE);
export const initDate = createAction(INIT_DATE);
export const loadSavedState = createAction(LOAD_SAVED_STATE);
export const changeChecked = createAction(CHANGE_CHECKED);
export const validate = createAction(VALIDATE);
export const updateTeamsByDateInfo = createAction(UPDATE_TEAMS_BY_DATE_INFO);

const initialState = fromJS({
  interviewDates: [
    {
      date: '',
      times: [],
    },
    {
      date: '',
      times: [],
    }
  ],
  // teams: [{ departmentName: '경영지원본부', name: 'IT기획팀' }]
  teamsByDate: [
    {
      date: '',
      teams: []
    },
    {
      date: '',
      teams: []
    }
  ]
});

export const checkInterviewDates = (selectedTeams) => {
  const interviewChoiceData = staticData.default.interviewChoice;
  let shouldInterviews = [false, false];
  for (let team of selectedTeams) {
    shouldInterviews[0] = shouldInterviews[0] || interviewChoiceData.firstDayTeams.includes(team);
    shouldInterviews[1] = shouldInterviews[1] || interviewChoiceData.secondDayTeams.includes(team);
  }
  return shouldInterviews;
}

export default handleActions({
  [INIT_STATE]: (_, action) => {
    return initialState
  },
  [INIT_DATE]: (state, action) => {
    const { interviewDates, index } = action.payload;
    return state.setIn(['interviewDates', index, 'date'], interviewDates[index].date);
  },
  [LOAD_SAVED_STATE]: (_, action) => state = fromJS(action.payload),
  [CHANGE_CHECKED]: (state, action) => {
    const interviewDates = state.get('interviewDates');
    const { date, time, index, checked } = action.payload;
    if (checked) {
      if (interviewDates.get(index).get('times').count() > 0) {
        const newTimes = interviewDates.get(index).get('times').push(time);
        const newDate = interviewDates.get(index).set('times', newTimes);
        return state.set('interviewDates', interviewDates.set(index, newDate));
      } else {
        return state.setIn(['interviewDates', index.toString()],
          fromJS({
            date: date,
            times: [time]
          })
        );
      }
    } else {
      const timeIndex = interviewDates.get(index).get('times').findIndex(d => d === time);
      const newTimes = interviewDates.get(index).get('times').delete(timeIndex);
      const newDate = interviewDates.get(index).set('times', newTimes);
      return state.set('interviewDates', interviewDates.set(index, newDate));
    }
  },
  [UPDATE_TEAMS_BY_DATE_INFO]: (state, action) => {
    const { info } = action.payload;
    return state.set('teamsByDate', fromJS(info));
  }
}, initialState)
