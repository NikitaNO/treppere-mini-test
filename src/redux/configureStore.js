import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import {
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import ReduxThunk from 'redux-thunk';
import * as reducers from './reducers';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router';
import { reducer as reduxForm } from 'redux-form';

const rrMiddleware = routerMiddleware(browserHistory);

const middleware = [
  ReduxThunk,
  rrMiddleware
];

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
  diff: true
});

// for development usage only
const devMiddleware = [
  logger
];

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
    form: reduxForm
  }),
  compose(
    applyMiddleware(...middleware, ...devMiddleware),
    window && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

export default store;
