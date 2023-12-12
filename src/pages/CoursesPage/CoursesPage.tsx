import React, { useEffect, useState } from 'react';

import { AppBar, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';

import { fetchCourses } from '@/services/courseService';
import { useUser } from '@/store/user/UserContext';

import { CreateCourseForm } from './CreateCourseForm';
import { EditCourseForm } from './EditCourseForm';
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

  const uniqueCourses = React.useMemo(() => {
    const courseMap = new Map();
    for (const course of courses) {
      courseMap.set(course.id, course);
    }
    return Array.from(courseMap.values());
  }, [courses]);

  const coursesByStatus = {
    Active: uniqueCourses.filter((course) => course.status === 'Active'),
    Inactive: uniqueCourses.filter((course) => course.status === 'Inactive'),
    All: uniqueCourses,
  };

  const tabLabels: (keyof typeof coursesByStatus)[] = ['Active', 'Inactive', 'All'];
  const selectedCourses = coursesByStatus[tabLabels[selectedTab]];

  return (
    <Grid container spacing={6} sx={{ padding: '1.5rem' }}>
      <Grid item container xs={12} md={6} sx={{ alignContent: 'flex-start' }}>
        {/* Create Course Form*/}
        <CreateCourseForm onCourseAdded={handleCourseAdded} />
        {/* Edit Course Form*/}
        <EditCourseForm onCourseUpdated={loadCourses} />
      </Grid>
      <Grid item container xs={12} md={6} sx={{ alignContent: 'flex-start' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            Your courses
          </Typography>
          <Typography sx={{ marginBottom: '1rem' }}>
            • All courses in which you are assigned as an instructor are listed here.
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
              boxShadow: '0 0 2px rgba(0,0,0,0.2)',
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
            border: '1px solid #bfbfbf',
            borderRadius: '0.5rem',
            boxShadow: '0 0 2px rgba(0,0,0,0.2)',
            alignContent: 'flex-start',
            padding: '0 1rem 1rem 0',
            margin: '0rem',
            height: '748px',
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
                    backgroundColor: '#f2f2f2',
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
    </Grid>
  );
}

export default CoursesPage;
