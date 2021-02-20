import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers';

const initialState = {};

// custom redux logger - comment console log to avoid console spam
const logger = () => next => action => {
  // console.log('dispatching', action);
  let result = next(action);
  // console.log('next state', storeAPI.getState());
  return result;
};
  
const middleware = (__DEV__) ? [thunk, logger] : [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;
