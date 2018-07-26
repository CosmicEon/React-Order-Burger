/* globals window */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

// Redux Devtools in Browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const reduxStore = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk),
));

export default reduxStore;
