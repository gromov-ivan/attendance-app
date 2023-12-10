import React, { useEffect, useState } from 'react';

import { AppBar, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';

import { fetchCourses } from '@/services/courseService';
import { useUser } from '@/store/user/UserContext';

import { CreateCourseForm } from './CreateCourseForm';
import { Course } from './types';

function CoursesPage() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const { userId } = useUser();

  const loadCourses = async () => {
    if (userId) {
      const loadedCourses = await fetchCourses(userId);
      setCourses(loadedCourses);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [userId]);

  const handleCourseAdded = () => {
    loadCourses();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const coursesByStatus = {
    Active: courses.filter((course) => course.status === 'Active'),
    Inactive: courses.filter((course) => course.status === 'Inactive'),
    All: courses,
  };

  const tabLabels: (keyof typeof coursesByStatus)[] = ['Active', 'Inactive', 'All'];
  const selectedCourses = coursesByStatus[tabLabels[selectedTab]];

  return (
    <Grid container spacing={2} sx={{ padding: '1.5rem 1.5rem' }}>
      <Grid item container xs={12} md={6} sx={{ height: '570px' }}>
        <CreateCourseForm onCourseAdded={handleCourseAdded} />
      </Grid>
      <Grid item container xs={12} md={6} sx={{ height: '570px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 500 }}>
            Your courses
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              background: '#fff',
              border: '1px solid #bfbfbf',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="course tabs"
              variant="fullWidth"
              sx={{ borderRadius: '0.5rem', padding: '0.5rem' }}
            >
              {tabLabels.map((label) => (
                <Tab key={label} label={label} disableTouchRipple />
              ))}
            </Tabs>
          </AppBar>
        </Grid>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          sx={{
            display: 'flex',
            border: '1px solid',
            borderColor: '#bfbfbf',
            borderRadius: '0.5rem',
            alignContent: 'flex-start',
            padding: '0 1rem 1rem 0',
            margin: '0rem',
            height: '423px',
            overflow: 'auto',
          }}
        >
          {selectedCourses.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No courses in this section.
              </Typography>
            </Grid>
          ) : (
            selectedCourses.map((course: Course) => (
              <Grid item xs={12} key={course.id}>
                <Paper
                  elevation={0}
                  sx={{
                    padding: '1rem',
                    border: '1px solid #bfbfbf',
                    borderRadius: '0.5rem',
                  }}
                >
                  <Typography variant="h6">
                    {course.course_code} | {course.course_group}
                  </Typography>
                  <Typography>Status: {course.status}</Typography>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 500 }}>
          Edit course
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CoursesPage;
