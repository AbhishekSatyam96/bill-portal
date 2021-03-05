import { combineReducers } from 'redux';
import BillReducer from './BillReducer'

const rootReducer = combineReducers({
  BillState : BillReducer
});

export default rootReducer;