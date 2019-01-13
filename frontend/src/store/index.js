import { applyMiddleware, createStore } from 'redux';
import { save } from 'redux-localstorage-simple'
import { fromJS } from 'immutable';

import reducers from '../modules';
import initailState from '../config/initialState'

const createStoreWithMiddleware
  = applyMiddleware(
  save() // Saving done here
)(createStore);

let preloadedState = initailState;

const reduxState = (window.localStorage.redux_localstorage_simple && JSON.parse(window.localStorage.redux_localstorage_simple)) || {};

Object.keys(reduxState).forEach(key => {
  preloadedState = {...preloadedState, ...({[key]:fromJS(reduxState[key])})}
});

const store = createStoreWithMiddleware(reducers, preloadedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
