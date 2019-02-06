import { applyMiddleware, compose, createStore } from 'redux';
import { save } from 'redux-localstorage-simple'
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import rootSaga from '../saga';
import reducers from '../modules';
import initailState from '../config/initialState'

const configureStore = (reducer, initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(
    applyMiddleware(sagaMiddleware, save()),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  const store = createStore(reducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);
  return store;
};

let preloadedState = initailState;

const reduxState = (window.localStorage.redux_localstorage_simple && JSON.parse(window.localStorage.redux_localstorage_simple)) || {};

Object.keys(reduxState).forEach(key => {
  preloadedState = {...preloadedState, ...({[key]:fromJS(reduxState[key])})}
});

const store = configureStore(reducers, preloadedState);

export default store;
