import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourse, fetchStudentAttendance } from '../store/actions';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { RootState } from '../store/reducers';  // Adjust the path as needed

const CourseSelection: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state: RootState) => state.attendance.selectedCourse);
  const courses = useSelector((state: RootState) => state.attendance.courses) as string[];

  useEffect(() => {
    console.log('CourseSelection: useEffect');
    if (selectedCourse) {
      dispatch(fetchStudentAttendance(selectedCourse));
    }
  }, [dispatch, selectedCourse]);

  const handleCourseChange = (courseId: string) => {
    dispatch(selectCourse(courseId));
  };

const fetchLessons = (courseId: string) => {
    // In a real application, you would fetch lessons from the database
    // For now, I'll return a sample data structure
    const lessons = ['Lesson 1', 'Lesson 2', 'Lesson 3'];
    const studentAttendance = [
      { name: 'Student1', attendance: 90 },
      { name: 'Student2', attendance: 75 },
      { name: 'Student3', attendance: 50 },
    ];
    dispatch(fetchStudentAttendance({ courseId, lessons, studentAttendance }));
  };
  
  return (
    <Grid container spacing={2} sx={{ padding: '1.5rem 1.5rem' }}>
      <Grid item container alignItems="center" spacing={2} sx={{ height: '50px' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 600 }}>
          Choose the course:
        </Typography>
        <Grid item>
          <Select
            value={selectedCourse}
            onChange={(e) => handleCourseChange(e.target.value as string)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Course' }}
          >
            <MenuItem value="" disabled>
              Select a course
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseSelection;
