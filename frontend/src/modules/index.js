import { combineReducers } from 'redux';
import apply from './apply';
import personal from './personal';
import interview from './interview';
import view from './view';
import user from './user';

export default combineReducers ({
  apply,
  personal,
  interview,
  view,
  user,
})
