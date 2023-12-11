import React, { useState } from 'react';

import { Autocomplete, Grid, TextField, Typography } from '@mui/material';

import { Course } from '@/pages/CoursesPage/types';
import { fetchCreatedCourses } from '@/services/courseService';
import { useUser } from '@/store/user/UserContext';

const CourseSelection: React.FC = () => {
  const { userId } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleAutocompleteOpen = async () => {
    if (userId) {
      const createdCourses = await fetchCreatedCourses(userId);
      setCourses(createdCourses);
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: '1.5rem 1.5rem', marginBottom: '4rem' }}>
      <Grid item container alignItems="center" spacing={2} sx={{ height: '50px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            Choose the course to see the attendace data
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            options={courses}
            getOptionLabel={(option) => `${option.course_code} | ${option.course_group}`}
            onChange={(event, newValue) => setSelectedCourse(newValue)}
            value={selectedCourse}
            onOpen={handleAutocompleteOpen}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a course"
                variant="outlined"
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#fff',
                    borderRadius: '0.5rem',
                  },
                  marginBottom: '2rem',
                }}
                size="small"
                fullWidth
                required
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseSelection;
