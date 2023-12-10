import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourse, fetchStudentAttendance } from '../store/actions';
import { Grid, MenuItem, Select, Typography } from '@mui/material';

const CourseSelection: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCourse = useSelector((state) => state.attendance.selectedCourse);

  useEffect(() => {
    // Fetch student attendance when the selected course changes
    if (selectedCourse) {
      dispatch(fetchStudentAttendance(selectedCourse));
    }
  }, [dispatch, selectedCourse]);

  const handleCourseChange = (courseId: string) => {
    // Dispatch an action to update the selected course
    dispatch(selectCourse(courseId));
  };

  // Assume courses are fetched from the database
  const courses = ['Course 1', 'Course 2', 'Course 3'];

  return (
    <Grid container spacing={2} sx={{ padding: '1.5rem 1.5rem' }}>
      <Grid item container alignItems="center" spacing={2} sx={{ height: '50px' }}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 600 }}>
          Choose the course:
        </Typography>
        <Grid item>
          <Select
            value={selectedCourse}
            onChange={(e) => handleCourseChange(e.target.value)}
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
