// store/reducers/attendanceReducer.ts

import { SELECT_COURSE, FETCH_STUDENT_ATTENDANCE } from '../actions';

const initialState = {
  selectedCourse: '',
  studentAttendance: [], // Array of students with attendance data
};

const attendanceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECT_COURSE:
      return {
        ...state,
        selectedCourse: action.payload,
      };
    case FETCH_STUDENT_ATTENDANCE:
      // Implement logic to fetch student attendance based on the selected course
      // For now, I'll return a sample data structure
      return {
        ...state,
        studentAttendance: [
          { name: 'Student1', attendance: 90 },
          { name: 'Student2', attendance: 75 },
          { name: 'Student3', attendance: 50 },
        ],
      };
    default:
      return state;
  }
};

export default attendanceReducer;
