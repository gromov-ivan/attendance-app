import { createStore, combineReducers } from 'redux';
import attendanceReducer from '../reducers/attendanceReducer';

const rootReducer = combineReducers({
  attendance: attendanceReducer,
  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;

