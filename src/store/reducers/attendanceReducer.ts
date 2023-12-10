import { SELECT_COURSE, FETCH_STUDENT_ATTENDANCE } from '../actions';
import { Action, SomeState } from '@/store/types';
import { ThunkAction } from 'redux-thunk';


// const someReducer = (state: SomeState, action: Action) => {
//   switch (action.type) {
//     case 'SOME_ACTION':
//       // Now TypeScript knows that action.payload is a valid property
//       const payloadData = action.payload;
//       // Rest of your reducer logic
//       return newState;
//     default:
//       return state;
//   }
// };

interface AttendanceState {
  selectedCourse: string;
  studentAttendance: Array<{ name: string; attendance: number }>;
  lessons: string[];
}

const initialState: AttendanceState = {
  selectedCourse: '',
  studentAttendance: [],
  lessons: [],
  courses: [],
};

const attendanceReducer = (state: AttendanceState = initialState, action: Action): AttendanceState => {
  switch (action.type) {
    case SELECT_COURSE: {
      const { payload } = action;
      return {
        ...state,
        selectedCourse: payload,
        lessons: [], // Reset lessons when course changes
      };
    }
    case FETCH_STUDENT_ATTENDANCE: {
      const { lessons, studentAttendance } = action.payload;
      return {
        ...state,
        lessons,
        studentAttendance,
      };
    }
    default:
      return state;
  }
};

export default attendanceReducer;
