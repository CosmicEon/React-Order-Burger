import { combineReducers } from 'redux';
import orderReducer from './order';
import burgerBuilderReducer from './burgerBuilder';


const rootReducer = combineReducers({
  orderReducer,
  burgerBuilderReducer,
});

export default rootReducer;
