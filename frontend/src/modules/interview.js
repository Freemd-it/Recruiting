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
      times: []
    },
    {
      day: '',
      times: []
    }
  ],
  validate: false
});

const checkValidates = (selectedDepartments) => {
  const interviewChoiceData = staticData.default.interviewChoice;
  let haveToValidates = [false, false];
  for (let department of selectedDepartments) {
    haveToValidates[0] = haveToValidates[0] || interviewChoiceData.firstDayDepartments.includes(department);
    haveToValidates[1] = haveToValidates[1] || interviewChoiceData.secondDayDepartments.includes(department);
  }
  return haveToValidates;
}

export default handleActions({
  [INIT_STATE]: (state, action) => {
    return initialState
  },
  [CHANGE_CHECKED]: (state, action) => {
    const interviewDates = state.get('interviewDates');
    const { day, time, index, checked, selectedDepartments } = action.payload;
    const haveToValidates = checkValidates(selectedDepartments);
    let updated = null;
    if (checked) {
      if (interviewDates.get(index).get('times').count() > 0) {
        const newTimes = interviewDates.get(index).get('times').push(time);
        const newDate = interviewDates.get(index).set('times', newTimes);
        updated = state.set('interviewDates', interviewDates.set(index, newDate));
      } else {
        updated = state.setIn(['interviewDates', index.toString()],
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
      updated = state.set('interviewDates', interviewDates.set(index, newDate));
    }

    let validate = true;
    for (let valIndex = 0; valIndex < haveToValidates.length; valIndex++) {
      let haveToValidate = haveToValidates[valIndex];
      let timeCount = updated.get('interviewDates').get(valIndex).get('times').count();
      if ((timeCount < 2 && haveToValidate) || (timeCount > 0 && !haveToValidate)) {
        validate = false;
      }
    }
    return updated.set('validate', validate);
  },

  [VALIDATE]: (state, action) => {
    const { selectedDepartments } = action.payload;
    const haveToValidates = checkValidates(selectedDepartments);
    let validate = true;
    for (let valIndex = 0; valIndex < haveToValidates.length; valIndex++) {
      let haveToValidate = haveToValidates[valIndex];
      let timeCount = state.get('interviewDates').get(valIndex).get('times').count();
      if ((timeCount < 2 && haveToValidate) || (timeCount > 0 && !haveToValidate)) {
        validate = false;
      }
    }
    return state.set('validate', validate);
  }
}, initialState)
