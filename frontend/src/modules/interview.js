import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map, List } from 'immutable';

const INIT_STATE = 'interview/INIT_STATE';
const CHANGE_CHECKED = 'interview/CHANGE_CHECKED';

export const initState = createAction(INIT_STATE);
export const changeChecked = createAction(CHANGE_CHECKED);

const initialState = fromJS({
  interviewDates: []
});

export default handleActions({
  [INIT_STATE]: (state, action) => {
    return initialState
  },
  [CHANGE_CHECKED]: (state, action) => {
    const interviewDates = state.get('interviewDates');
    const { day, time, checked } = action.payload;
    if (checked) {
      const dayIndex = interviewDates.findIndex(d => d.get('day') == day);
      if (dayIndex !== -1) {
        const newTimes = interviewDates.get(dayIndex).get('times').push(time);
        const newDate = interviewDates.get(dayIndex).set('times', newTimes);
        return state.set('interviewDates', interviewDates.set(dayIndex, newDate));
      } else {
        return state.set('interviewDates', interviewDates.push(
          Map({
            day: day,
            times: List([time])
          })
        ));
      }
    } else {
      const dayIndex = interviewDates.findIndex(d => d.get('day') == day);
      const timeIndex = interviewDates.get(dayIndex).get('times').findIndex(d => d === time);
      const newTimes = interviewDates.get(dayIndex).get('times').delete(timeIndex);
      const newDate = interviewDates.get(dayIndex).set('times', newTimes);
      return state.set('interviewDates', interviewDates.set(dayIndex, newDate));
    }
  }
}, initialState)