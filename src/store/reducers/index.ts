// store/reducers/index.ts

interface SelectCourseAction {
    type: 'SELECT_COURSE';
    payload: string;
  }
  
  const initialState = {
    selectedCourse: '',
    courses: ['Programming', 'Math', 'Java', 'Linux'],
    student: ['Student 1', 'Student 2', 'Student 3'],
    attendanceData: [
      { name: 'Student1', attendance: 90 },
      { name: 'Student2', attendance: 75 },
      { name: 'Student3', attendance: 50 },
      // Add more student data as needed
    ],
  };
  
  const rootReducer = (state = initialState, action: SelectCourseAction) => {
    switch (action.type) {
      case 'SELECT_COURSE':
        return {
          ...state,
          selectedCourse: action.payload,
        };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default rootReducer;
  