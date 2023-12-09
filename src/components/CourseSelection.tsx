import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourse, fetchStudentAttendance } from '../store/actions';

const CourseSelection: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.attendance.selectedCourse);

  useEffect(() => {
    // Fetch student attendance when the selected course changes
    dispatch(fetchStudentAttendance(selectedCourse));
  }, [dispatch, selectedCourse]);

  const handleCourseChange = (courseId: string) => {
    // Dispatch an action to update the selected course
    dispatch(selectCourse(courseId));
  };

  // Assume courses are fetched from the database
  const courses = ['Course 1', 'Course 2', 'Course 3'];

  return (
    <div>
      <label>Select Course:</label>
      <select value={selectedCourse} onChange={(e) => handleCourseChange(e.target.value)}>
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseSelection;
