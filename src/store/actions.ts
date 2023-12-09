export const SELECT_COURSE = 'SELECT_COURSE';
export const FETCH_STUDENT_ATTENDANCE = 'FETCH_STUDENT_ATTENDANCE';

export const selectCourse = (courseId: string) => ({
  type: SELECT_COURSE,
  payload: courseId,
});

export const fetchStudentAttendance = (courseId: string) => ({
  type: FETCH_STUDENT_ATTENDANCE,
  payload: courseId,
});
