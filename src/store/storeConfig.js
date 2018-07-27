/* globals window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// Redux DevTools in Browser
const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  // eslint-disable-line
  : null || compose;

const reduxStore = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk),
));

export default reduxStore;
