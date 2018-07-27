import { combineReducers } from 'redux';
import authReducer from './auth';
import burgerBuilderReducer from './burgerBuilder';
import orderReducer from './order';


const rootReducer = combineReducers({
  authReducer,
  burgerBuilderReducer,
  orderReducer,
});

export default rootReducer;
