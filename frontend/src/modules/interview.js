import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import * as staticData from '../common/pageStaticData';

const INIT_STATE = 'interview/INIT_STATE';
const CHANGE_CHECKED = 'interview/CHANGE_CHECKED';
const VALIDATE = 'interview/VALIDATE';

export const initState = createAction(INIT_STATE);
export const changeChecked = createAction(CHANGE_CHECKED);
export const validate = createAction(VALIDATE);

const initialState = fromJS({
  interviewDates: [
    {
      day: '',
      times: [],
    },
    {
      day: '',
      times: [],
    }
  ],
});

export const checkInterviewDates = (selectedDepartments) => {
  const interviewChoiceData = staticData.default.interviewChoice;
  let shouldInterviews = [false, false];
  for (let department of selectedDepartments) {
    shouldInterviews[0] = shouldInterviews[0] || interviewChoiceData.firstDayDepartments.includes(department);
    shouldInterviews[1] = shouldInterviews[1] || interviewChoiceData.secondDayDepartments.includes(department);
  }
  return shouldInterviews;
}

export default handleActions({
  [INIT_STATE]: (state, action) => {
    return initialState
  },
  [CHANGE_CHECKED]: (state, action) => {
    const interviewDates = state.get('interviewDates');
    const { day, time, index, checked } = action.payload;
    if (checked) {
      if (interviewDates.get(index).get('times').count() > 0) {
        const newTimes = interviewDates.get(index).get('times').push(time);
        const newDate = interviewDates.get(index).set('times', newTimes);
        return state.set('interviewDates', interviewDates.set(index, newDate));
      } else {
        return state.setIn(['interviewDates', index.toString()],
          fromJS({
            day: day,
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
}, initialState)
