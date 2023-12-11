import { combineReducers } from 'redux';

import attendanceReducer from './attendanceReducer';

export interface RootState {
  attendance: {
    selectedCourse: string;
    studentAttendance: { name: string; attendance: number }[];
    lessons: string[];
    courses: string[];
  };
}

const rootReducer = combineReducers({
  attendance: attendanceReducer,
});

export default rootReducer;
